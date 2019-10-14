const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const db = require('../models');

const router = express.Router();

router.get('/', async (req, res, next) => { // /api/user/
    if (!req.user) {
        return res.status(401).send('로그인이 필요합니다.');
    }
    const fullUser = await db.User.findOne({
        where: { id: req.user.id },
        include: [{
            model: db.Post,
            as: 'Posts',
            attributes: ['id'],
        }, {
            model: db.User,
            as: 'Followings',
            attributes: ['id'],
        }, {
            model: db.User,
            as: 'Followers',
            attributes: ['id'],
        }],
        attributes: ['id', 'nickname', 'userId'],
    })
    return res.json(fullUser);
});

router.post('/', async (req, res, next) => { // POST /api/user 회원가입
    try {
        const exUser = await db.User.findOne({
            where: {
                userId: req.body.userId,
            },
        });
        if (exUser) {
            return res.status(403).send('이미 사용중인 아이디입니다.');
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 12); // salt는 10~13 사이로 한다.
        const newUser = await db.User.create({
            nickname: req.body.nickname,
            userId: req.body.userId,
            password: hashedPassword,
        });
        console.log(newUser);
        return res.status(200).json(newUser);
    } catch (e) {
        console.error(e);
        // 에러 처리를 여기서 한다.
        return next(e);
    }
});

router.get('/:id', (req, res, next) => { // 남의 정보 가져오는 것 ex) /3

});

router.post('/logout', (req, res, next) => { // /api/logout
    req.logout();
    req.session.destroy();
    res.send('logout 성공');
});

router.post('/login', (req, res, next) => { // POST /api/user/login
    passport.authenticate('local', (err, user, info) => {
        console.log(err, user, info);
        if (err) {
            console.error(err);
            return next(err);
        }
        if (info) {
            return res.status(401).send(info.reason);
        }
        return req.login(user, async (loginErr) => {
            if (loginErr) {
                return next(loginErr);
            }
            console.log('req.user: ', req.user);
            const fullUser = await db.User.findOne({
                where: { id: user.id },
                include: [{
                    model: db.Post,
                    as: 'Posts',
                    attributes: ['id'],
                }, {
                    model: db.User,
                    as: 'Followings',
                    attributes: ['id'],
                }, {
                    model: db.User,
                    as: 'Followers',
                    attributes: ['id'],
                }],
                attributes: ['id', 'nickname', 'userId'],
            })
            return res.json(fullUser);
        });
    })(req, res, next);
});

router.get('/:id/follow', (req, res, next) => { // /api/user/:id/follow

});

router.post('/:id/follow', (req, res, next) => {

});

router.delete('/:id/follower', (req, res, next) => {

});

router.get('/:id/posts', (req, res, next) => {

});

module.exports = router;
