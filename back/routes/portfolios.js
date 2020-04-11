const express = require('express');
const db = require('../models');
const { isLoggedIn } = require('./middleware');

const router = express.Router();

router.get('/main/:page', async (req, res, next) => { // GET /posts
    try {
        const limit = 12;
        let offset = 0;
        if (parseInt(req.params.page, 10) > 1) {
            offset = limit * (parseInt(req.params.page, 10) - 1);
        }
        const portfolios = await db.Portfolio.findAndCountAll({
            include: [{
                model: db.User,
                attributes: ['id'],
            }, {
                model: db.PortfolioImage,
            }],
            where: { visible: true },
            order: [['createdAt', 'DESC']], // DESC 내림차순, ASC는 오름차순
            limit,
            offset,
        });
        if (parseInt(req.params.page, 10) > Math.ceil(parseInt(portfolios.count, 10) / limit)) {
            return res.status(404).json({ 
                lastPage: Math.ceil(parseInt(portfolios.count, 10) / limit),
                message: '게시물이 없는 페이지 입니다.',
            });
        }
        return res.json(portfolios);
    } catch (e) {
        console.error(e);
        return next(e);
    }
});

router.get('/management/:page', isLoggedIn, async (req, res, next) => { // GET /posts
    try {
        const limit = 10;
        let offset = 0;
        if (parseInt(req.params.page, 10) > 1) {
            offset = limit * (parseInt(req.params.page, 10) - 1);
        }
        const portfolios = await db.Portfolio.findAndCountAll({
            include: [{
                model: db.User,
                attributes: ['id'],
            }, {
                model: db.PortfolioImage,
            }],
            order: [['createdAt', 'DESC']], // DESC 내림차순, ASC는 오름차순
            limit,
            offset,
        });
        if (parseInt(req.params.page, 10) > Math.ceil(parseInt(portfolios.count, 10) / limit)) {
            return res.status(404).json({ 
                lastPage: Math.ceil(parseInt(portfolios.count, 10) / limit),
                message: '게시물이 없는 페이지 입니다.',
            });
        }
        return res.json(portfolios);
    } catch (e) {
        console.error(e);
        return next(e);
    }
});

module.exports = router;
