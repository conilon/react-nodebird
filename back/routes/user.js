const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const db = require('../models');
const { isLoggedIn } = require('./middleware');

const router = express.Router();

router.get('/', isLoggedIn, async (req, res, next) => { // /api/user/
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
        attributes: ['id', 'nickname'],
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
        return res.status(200).json(newUser);
    } catch (e) {
        console.error(e);
        // 에러 처리를 여기서 한다.
        return next(e);
    }
});

router.get('/:id', async (req, res, next) => { // 남의 정보 가져오는 것 ex) /api/user/3
    try {
        const user = await db.User.findOne({
            where: { id: parseInt(req.params.id, 10) },
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
            attributes: ['id', 'nickname'],
        });
        const jsonUser = user.toJSON();
        jsonUser.Posts = jsonUser.Posts ? jsonUser.Posts.length : 0;
        jsonUser.Followings = jsonUser.Followings ? jsonUser.Followings.length : 0;
        jsonUser.Followers = jsonUser.Followers ? jsonUser.Followers.length : 0;
        return res.json(jsonUser);
    } catch (e) {
        console.error(e);
        return next(e);
    }
});

router.post('/logout', (req, res, next) => { // /api/logout
    req.logout();
    req.session.destroy();
    res.send('logout 성공');
});

router.post('/login', (req, res, next) => { // POST /api/user/login
    passport.authenticate('local', (err, user, info) => {
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

router.get('/:id/posts', async (req, res, next) => {
    try {
        const posts = await db.Post.findAll({
            where: { 
                UserId: parseInt(req.params.id, 10),
                RetweetId: null,
            },
            include: [{
                model: db.User,
                attributes: ['id', 'nickname'],
            }, {
                model: db.Image,
            }, {
                model: db.User,
                through: 'Like',
                as: 'Likers',
                attributes: ['id'],
            }],
        });
        return res.json(posts);
    } catch (e) {
        console.error(e);
        return next(e);
    }
});

module.exports = router;
