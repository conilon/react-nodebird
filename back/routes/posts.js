const express = require('express');
const db = require('../models');

const router = express.Router();

router.get('/', async (req, res, next) => { // GET /posts
    try {
        const posts = await db.Post.findAll({
            include: [{
                model: db.User,
                attributes: ['id', 'nickname'],
            }],
            order: [['createdAt', 'DESC']], // DESC 내림차순, ASC는 오름차순
        });
        return res.json(posts);
    } catch (e) {
        console.error(e);
        return next(e);
    }
});

module.exports = router;
