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

router.post('/images', isLoggedIn, upload3.single('image'), (req, res, next) => {
    const info = {
        originalname: req.file.originalname,
        filename: req.file.filename,
        url: req.file.location,
        thumbUrl: req.file.location,
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
            }]
        });
        if (!portfolio) {
            return res.status(404).send('포트폴리오가 존재하지 않습니다.');
        }
        return res.json(portfolio);
    } catch (e) {
        console.error(e);
        return next(e);
    }
});

router.post('/', isLoggedIn, upload3.none(), async (req, res, next) => {
    console.log(req.body);
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
                    src: decodeURIComponent(req.body.filename),
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
