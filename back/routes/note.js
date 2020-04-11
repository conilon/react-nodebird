const express = require('express');
const multer = require('multer');
const path = require('path');
var Sequelize = require('sequelize'), 
    sequelize = new Sequelize(process.env.DATABASE, process.env.USER_NAME, process.env.DB_PASSWORD, {
        dialect: "mysql", // or 'sqlite', 'postgres', 'mariadb'
        port: 3306, // or 5432 (for postgres)
});

const db = require('../models');
const { isLoggedIn } = require('./middleware');

const router = express.Router();

const prod = process.env.NODE_ENV === 'production';

const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, done) {
            done(null, 'uploads/note');
        },
        filename(req, file, done) {
            const ext = path.extname(file.originalname);
            const basename = path.basename(file.originalname, ext); // th.png, ext === .png, basename === th
            done(null, basename + new Date().valueOf() + ext);
        }
    }),
    limits: { fileSize: 20 * 1024 * 1024 },
});

router.post('/upload', isLoggedIn, upload.single('file'), (req, res, next) => {
    const url = prod ? `http://api.thmsy.com/note/` : `http://localhost:3065/note/`
    const info = {
        originalname: decodeURIComponent(req.file.originalname),
        filename: decodeURIComponent(req.file.originalname),
        url: url + `${req.file.filename}`,
        thumbUrl: url + `${req.file.filename}`,
    }
    return res.json(info);
});

router.post('/', isLoggedIn, upload.none(), async (req, res, next) => {
    try {
        const category = await db.Category.findOne({ where: { id: req.body.category } });
        const newNote = await db.Note.create({
            title: req.body.title,
            content: req.body.content,
            visible: req.body.visible,
            UserId: req.user.id,
        });
        await category.addNote(newNote.id);
        const addedNote = await db.Note.findOne({
            where: { id: newNote.id },
            include: [{
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

router.get('/category/:category/:page', async (req, res, next) => {
    try {
        const limit = 24;
        let offset = 0;
        if (parseInt(req.params.page, 10) > 1) {
            offset = limit * (parseInt(req.params.page, 10) - 1);
        }
        const categoryId = await db.Category.findOne({
            where: { name: req.params.category, visible: 1 },
            attributes: ['id'],
        });
        const note = await db.Note.findAndCountAll({
            where: { CategoryId: categoryId.id, visible: 1 },
            order: [['id', 'DESC']],
            offset,
            limit,
            attributes: ['id', 'title', 'content',
                [sequelize.literal('DATE_ADD(Note.createdAt, INTERVAL 9 HOUR)'), 'createdAt'],
            ],
            include: [{
                model: db.Category,
                attributes: ['id', 'name'],
            },{
                model: db.User,
                attributes: ['id', 'nickname'],
            }],
        });
        if (!note) {
            return res.status(404).send('note is empty.');
        }
        if (req.params.page > Math.ceil(note.count / limit)) {
            return res.status(404).json({ 
                lastPage: Math.ceil(note.count / limit),
                message: 'note is empty.',
            });
        }
        // note.temp = ['1', ['2', '3']];
        return res.json(note);
    } catch (e) {
        console.error(e);
        return next(e);
    }
});

router.get('/category/:category/view/:id', async (req, res, next) => {
    try {
        const categoryId = await db.Category.findOne({
            where: { name: req.params.category, visible: 1 },
            attributes: ['id'],
        });
        const note = await db.Note.findOne({
            where: { id: req.params.id, visible: 1, CategoryId: categoryId.id },
            attributes: ['id', 'title', 'content',
                [sequelize.literal('DATE_ADD(Note.createdAt, INTERVAL 9 HOUR)'), 'createdAt'],
            ],
            include: [{
                model: db.Category,
                attributes: ['id', 'name'],
            },{
                model: db.User,
                attributes: ['id', 'nickname'],
            }],
        });
        if (!note) {
            return res.status(404).send('note is empty.');
        }
        return res.json(note);
    } catch (e) {
        console.error(e);
        return next(e);
    }
});

router.get('/all', async (req, res, next) => {
    try {
        // const limit = 5;
        // const note = await db.Category.findAll({
        //     where: { visible: 1 },
        //     include: [{
        //         model: db.Category,
        //         attributes: {
        //             include: [
        //                 [sequelize.fn('COUNT', sequelize.col('*')), 'conut']
        //             ],
        //         },
        //         limit,
        //     }],
        //     include: [{
        //         model: db.Note,
        //         limit,
        //     }],
           
        // });
        // const category = await db.Category.findAll({
        //     where: { visible: 1 },
        //     attributes: ['id', 'name', 'content',
        //         [sequelize.fn('COUNT', sequelize.col('*')), 'count']],
        //     include: [{
        //         model: db.Note,
        //         attributes: [],
        //     }],
        //     group: ['name'],
        // });

        const category = await sequelize.query(
            `SELECT categories.id, categories.name, categories.content, count(*) AS count 
            FROM categories
            JOIN notes ON notes.CategoryId = categories.id 
            WHERE categories.visible = 1 and notes.visible = 1
            GROUP BY categories.id`, {
                nest: true,
            },
        );

        const note = await sequelize.query(
            `SELECT id, title, content, createdAt, CategoryId
            FROM (SELECT id, title, content, visible, createdAt, CategoryId,
                    @rn := CASE WHEN @cd = CategoryId THEN @rn + 1 ELSE 1 END rn,
                    @cd := categoryId
                    FROM (SELECT * FROM Notes WHERE visible = 1 ORDER BY categoryId desc, id desc) a, 
                    (SELECT @cd := '', @rn := 0) b
            ) a 
            WHERE rn <= 5 and visible = 1 and CategoryId is not null`, {
                nest: true,
            },
        );

        category.map((v) => {
            v.Notes = [];
            note.map((z) => {
                if (v.id === z.CategoryId) {
                    v.Notes.push(z);
                }
            });
        });

        return res.json(category);
    } catch (e) {
        console.error(e);
        return next(e);
    }
});

module.exports = router;
