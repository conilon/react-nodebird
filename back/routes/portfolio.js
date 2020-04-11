const express = require('express');
const multer = require('multer');
const path = require('path');
const AWS = require('aws-sdk');
const multerS3 = require('multer-s3');

const db = require('../models');
const { isLoggedIn } = require('./middleware');

const router = express.Router();

AWS.config.update({
    region: 'ap-northeast-2',
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
});

const upload3 = multer({
    storage: multerS3({
        s3: new AWS.S3(),
        bucket: process.env.S3_BUCKET,
        key(req, file, cb) {
            cb(null, `original/${+new Date()}${path.basename(file.originalname)}`);
        },
    }),
    limits: { fileSize: 20 * 1024 * 1024 },
});

const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, done) {
            done(null, 'uploads');
        },
        filename(req, file, done) {
            const ext = path.extname(file.originalname);
            const basename = path.basename(file.originalname, ext); // th.png, ext === .png, basename === th
            done(null, basename + new Date().valueOf() + ext);
        }
    }),
    limits: { fileSize: 20 * 1024 * 1024 },
});

router.post('/images', isLoggedIn, upload.single('image'), (req, res, next) => {
    const info = {
        originalname: req.file.originalname,
        filename: req.file.filename,
        url: `http://localhost:3065/${req.file.filename}`,
        thumbUrl: `http://localhost:3065/${req.file.filename}`,
    }
    return res.json(info);
});

router.get('/:id', async (req, res, next) => {
    try {
        const portfolio = await db.Portfolio.findOne({
            where: { id: req.params.id },
            order: [['id', 'ASC']],
            include: [{
                model: db.User,
                attributes: ['id', 'nickname'],
            }, {
                model: db.PortfolioImage,
                attributes: ['uid', 'name', 'url'],
            }]
        });
        if (!portfolio) {
            return res.status(404).send('There is no portfolio data.');
        }
        return res.json(portfolio);
    } catch (e) {
        console.error(e);
        return next(e);
    }
});

router.post('/', isLoggedIn, upload.none(), async (req, res, next) => {
    try {
        const newPortfolio = await db.Portfolio.create({
            company: req.body.company,
            website: req.body.website,
            content: req.body.content,
            visible: req.body.visible,
            UserId: req.user.id,
        });
        if (req.body.uid) { // 이미지 주소를 여러개 올리면 image: [주소1, 주소2]
            if (Array.isArray(req.body.uid)) {
                const images = await Promise.all(req.body.uid.map((uid, i) => {
                    return db.PortfolioImage.create({ 
                        uid,
                        filename: decodeURIComponent(req.body.filename[i]),
                        name: req.body.name[i], 
                        url: decodeURIComponent(req.body.url[i]),
                    });
                }));
                await newPortfolio.addPortfolioImage(images);
            } else { // 이미지를 하나만 올리면 image: 주소1
                const image = await db.PortfolioImage.create({
                    uid: req.body.uid,
                    filename: decodeURIComponent(req.body.filename),
                    name: req.body.name, 
                    url: decodeURIComponent(req.body.url),
                });
                await newPortfolio.addPortfolioImage(image);
            }
        }
        const addedPortfolio = await db.Portfolio.findOne({
            where: { id: newPortfolio.id },
            include: [{
                model: db.User,
                attributes: ['id', 'nickname'],
            }, {
                model: db.PortfolioImage,
            }, {
                model: db.User,
                attributes: ['id'],
            }],
        });
        return res.json(addedPortfolio);
    } catch (e) {
        console.log(e);
        next(e);
    }
});

router.put('/', isLoggedIn, upload.none(), async (req, res, next) => {
    try {
        const exUid = await db.PortfolioImage.findAll({
            where : { portfolioId: req.body.id },
            attributes: ['uid'],
        }).map((s) => { return s.uid; });

        const deleteImagesFunc = async (deleteImages) => {
            await deleteImages.map(uid => {
                return db.PortfolioImage.destroy({
                    where: { uid },
                });
            });
        }

        await db.Portfolio.update({
            company: req.body.company,
            website: req.body.website,
            content: req.body.content,
            visible: req.body.visible,
        }, {
            where: { id: req.body.id },
        });

        if (req.body.uid) {
            const uid = Array.isArray(req.body.uid) ? req.body.uid.map(uid => uid) : [req.body.uid];

            const passImages = exUid.filter(it => uid.includes(it)); // 패스 될 것
            const deleteImages = exUid.filter(it => !uid.includes(it)); // 삭제 될 것
            const addImages = uid.filter(it => !exUid.includes(it)); // 추가 될 것

            if (deleteImages.length) {
                deleteImagesFunc(deleteImages);
            }

            if (addImages.length) {
                const images = await uid.map((uid, i) => {
                    if (!exUid.includes(uid)) {
                        return db.PortfolioImage.create({ 
                            uid,
                            filename: decodeURIComponent(Array.isArray(req.body.filename) ? req.body.filename[i] : req.body.filename),
                            name: decodeURIComponent(Array.isArray(req.body.name) ? req.body.name[i] : req.body.name), 
                            url: decodeURIComponent(Array.isArray(req.body.url) ? req.body.url[i] : req.body.url),
                            PortfolioId: req.body.id,
                        });
                    }
                });
            }
        } else {
            const deleteImages = exUid;
            
            if (deleteImages.length) {
                deleteImagesFunc(deleteImages);
            }
        }

        const portfolio = await db.Portfolio.findOne({
            where: { id: req.body.id },
            include: [{
                model: db.User,
                attributes: ['id'],
            }, {
                model: db.PortfolioImage,
            }],
        });
        return res.json(portfolio);
    } catch (e) {
        console.log(e);
        next(e);
    }
});

router.patch('/visible', isLoggedIn, async (req, res, next) => {
    try {
        await db.Portfolio.update({
            visible: !req.body.visible,
        }, {
            where: { id: req.body.portfolioId },
        });
        return res.send(!req.body.visible);
    } catch (e) {
        console.error(e);
        return next(e);
    }
});

module.exports = router;
