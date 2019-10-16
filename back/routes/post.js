const express = require('express');
const multer = require('multer');
const path = require('path');
const db = require('../models');
const { isLoggedIn, exPost } = require('./middleware');

const router = express.Router();

router.post('/', isLoggedIn, async (req, res, next) => { // POST /api/post
    try {
        const hashtags = req.body.content.match(/#[^\s]+/g);
        const newPost = await db.Post.create({
            content: req.body.content,
            UserId: req.user.id,
        });
        if (hashtags) {
            const result = await Promise.all(hashtags.map(tag => db.Hashtag.findOrCreate({ 
                where: { name: tag.slice(1).toLowerCase(), },
            })));
            await newPost.addHashtags(result.map(r => r[0]));
        }
        const fullPost = await db.Post.findOne({
            where: { id: newPost.id },
            include: [{
                model: db.User,
                attributes: ['id', 'nickname', 'userId'],
            }],
        });
        return res.json(fullPost);
    } catch (e) {
        console.error(e);
        return next(e);
    }
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
router.post('/images', upload.array('image'), (req, res, next) => {
    console.log(req.files);
    res.json(req.files.map((v) => v.filename));
});

router.get('/:id/comments', exPost, async (req, res, next) => { // GET /api/post/14/comments
    try {
        const comments = await db.Comment.findAll({
            where: {
                PostId: req.params.id,
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

router.post('/:id/comment', isLoggedIn, exPost, async (req, res, next) => { // POST /api/post/10000/comment
    try {
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

module.exports = router;
