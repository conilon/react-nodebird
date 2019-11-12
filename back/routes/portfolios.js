const express = require('express');
const db = require('../models');

const router = express.Router();

router.get('/', async (req, res, next) => { // GET /posts
    try {
        const portfolios = await db.Portfolio.findAll({
            include: [{
                model: db.User,
                attributes: ['id', 'nickname'],
            }, {
                model: db.PortfolioImage,
            }],
            where: { visible: true },
            order: [['createdAt', 'DESC']], // DESC 내림차순, ASC는 오름차순
        });
        console.log(portfolios);
        return res.json(portfolios);
    } catch (e) {
        console.error(e);
        return next(e);
    }
});

module.exports = router;
