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

router.get('/note/:category/:page', isLoggedIn, async (req, res, next) => {
    try {
        const limit = 12;
        let offset = 0;
        if (parseInt(req.params.page, 10) > 1) {
            offset = limit * (parseInt(req.params.page, 10) - 1);
        }
        const note = await db.Note.findOne({
            where: { 
                category: req.params.category,
                visible: 1,
            },
            order: [['id', 'ASC']],
            attributes: ['uid', 'title', 'content'],
            limit,
            offset,
            include: [{
                model: db.User,
                attributes: ['id', 'nickname'],
            }],
        });
        if (!note) {
            return res.status(404).send('note is empty.');
        }
        return res.json(portfolio);
    } catch (e) {
        console.error(e);
        return next(e);
    }
});

router.get('/note/category(/:page([0-9]*))', isLoggedIn, async (req, res, next) => { // GET /note/category/{$page}
    try {
        const limit = 10;
        let offset = 0;
        if (parseInt(req.params.page, 10) > 1) {
            offset = limit * (parseInt(req.params.page, 10) - 1);
        }
        const NoteCategory = await db.NoteCategory.findAndCountAll({
            order: [['createdAt', 'DESC']],
            limit,
            offset,
        });
        if (parseInt(req.params.page, 10) > Math.ceil(parseInt(NoteCategory.count, 10) / limit)) {
            return res.status(404).json({ 
                lastPage: Math.ceil(parseInt(NoteCategory.count, 10) / limit),
                message: 'This page has no categories.',
            });
        }
        return res.json(NoteCategory);
    } catch (e) {
        console.error(e);
        return next(e);
    }
});

router.post('/note/category', isLoggedIn, upload.none(), async (req, res, next) => {
    try {
        const newNoteCategory = await db.NoteCategory.create({
            name: req.body.name,
            content: req.body.content,
            visible: req.body.visible,
        });
        const addedNoteCategory = await db.NoteCategory.findOne({
            where: { id: newNoteCategory.id },
        });
        return res.json(addedNoteCategory);
    } catch (e) {
        console.log(e);
        next(e);
    }
});

router.patch('/note/category/visible(/:id([0-9]*))', isLoggedIn, async (req, res, next) => {
    try {
        await db.NoteCategory.update({
            visible: !req.body.visible,
        }, {
            where: { id: req.params.id },
        });
        return res.send(!req.body.visible);
    } catch (e) {
        console.error(e);
        return next(e);
    }
});

router.get('/note/category/single(/:id([0-9]*))', async (req, res, next) => {
    try {
        const noteCategory = await db.NoteCategory.findOne({
            where: { id: req.params.id },
            order: [['id', 'ASC']],
        });
        if (!noteCategory) {
            return res.status(404).send('There is no note category data.');
        }
        return res.json(noteCategory);
    } catch (e) {
        console.error(e);
        return next(e);
    }
});

router.put('/note/category/single', isLoggedIn, upload.none(), async (req, res, next) => {
    try {
        await db.NoteCategory.update({
            name: req.body.name,
            content: req.body.content,
            visible: req.body.visible,
        }, {
            where: { id: req.body.id },
        });

        const noteCategory = await db.NoteCategory.findOne({
            where: { id: req.body.id },
        });
        return res.json(noteCategory);
    } catch (e) {
        console.log(e);
        next(e);
    }
});

router.post('/note', isLoggedIn, upload.none(), async (req, res, next) => {
    try {
        const newNote = await db.Note.create({
            title: req.body.title,
            content: req.body.content,
            visible: req.body.visible,
            UserId: req.user.id,
        });
        const addedNote = await db.Note.findOne({
            where: { id: newNote.id },
            include: [{
                model: db.User,
                attributes: ['id', 'nickname'],
            }, {
                model: db.User,
                attributes: ['id'],
            }],
        });
        return res.json(addedNote);
    } catch (e) {
        console.log(e);
        next(e);
    }
});

module.exports = router;
