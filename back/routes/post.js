const express = require('express');
const multer = require('multer');
const path = require('path');
const db = require('../models');
const { isLoggedIn } = require('./middleware');

const router = express.Router();

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

router.post('/', isLoggedIn, upload.none(), async (req, res, next) => { // POST /api/post
    try {
        const hashtags = req.body.content.match(/#[^\s]+/g);
        const newPost = await db.Post.create({
            content: req.body.content,
            UserId: req.user.id,
        });
        if (hashtags) {
            const result = await Promise.all(hashtags.map((tag) => db.Hashtag.findOrCreate({ 
                where: { name: tag.slice(1).toLowerCase(), },
            })));
            await newPost.addHashtags(result.map(r => r[0]));
        }
        if (req.body.image) { // 이미지 주소를 여러개 올리면 image: [주소1, 주소2]
            if (Array.isArray(req.body.image)) {
                const images = await Promise.all(req.body.image.map((image) => {
                    return db.Image.create({ src: image });
                }));
                await newPost.addImage(images);
            } else { // 이미지를 하나만 올리면 image: 주소1
                const image = await db.Image.create({ src: req.body.image });
                await newPost.addImage(image);
            }
        }
        const fullPost = await db.Post.findOne({
            where: { id: newPost.id },
            include: [{
                model: db.User,
                attributes: ['id', 'nickname'],
            }, {
                model: db.Image,
            }],
        });
        return res.json(fullPost);
    } catch (e) {
        console.error(e);
        return next(e);
    }
});

router.post('/images', upload.array('image'), (req, res, next) => {
    console.log(req.files);
    res.json(req.files.map((v) => v.filename));
});

router.get('/:id/comments', async (req, res, next) => { // GET /api/post/14/comments
    try {
        const post = await db.Post.findOne({ where: { id: req.params.id } });
        if (!post) {
            return res.status(404).send('포스트가 존재하지 않습니다.');
        }
        const comments = await db.Comment.findAll({
            where: {
                PostId: post.id,
            },
            order: [['createdAt', 'ASC']],
            include: [{
                model: db.User,
                attributes: ['id', 'nickname'],
            }],
        });
        return res.json(comments);
    } catch (e) {
        console.error(e);
        return next(e);
    }
});

router.post('/:id/comment', isLoggedIn, async (req, res, next) => { // POST /api/post/10000/comment
    try {
        const post = await db.Post.findOne({ where: { id: req.params.id } });
        if (!post) {
            return res.status(404).send('포스트가 존재하지 않습니다.');
        }
        const newComment = await db.Comment.create({
            PostId: post.id,
            UserId: req.user.id,
            content: req.body.content,
        });
        await post.addComment(newComment.id);
        const comment = await db.Comment.findOne({
            where: {
                id: newComment.id,
            },
            include: [{
                model: db.User,
                attributes: ['id', 'nickname'],
            }],
        })
        return res.json(comment);
    } catch (e) {
        console.error(e);
        return next(e);
    }
});

router.post('/:id/like', isLoggedIn, async (req, res, next) => { // POST /api/post/10000/like
    try {
        const post = await db.Post.findOne({ where: { id: req.params.id } });
        if (!post) {
            return res.status(404).send('포스트가 존재하지 않습니다.');
        }
        await post.addLikers(req.user.id);
        return res.json({ userId: req.user.id });
    } catch (e) {
        console.error(e);
        return next(e);
    }
});

router.delete('/:id/like', isLoggedIn, async (req, res, next) => { // POST /api/post/10000/like
    try {
        const post = await db.Post.findOne({ where: { id: req.params.id } });
        if (!post) {
            return res.status(404).send('포스트가 존재하지 않습니다.');
        }
        await post.removeLikers(req.user.id);
        return res.json({ userId: req.user.id });
    } catch (e) {
        console.error(e);
        return next(e);
    }
});

module.exports = router;
