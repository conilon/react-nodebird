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

router.get('/', async (req, res, next) => {
  try {
    const category = await db.Category.findAll({
      where: { visible: 1 },
      attributes: ['id', 'name', 'content',
        [sequelize.fn('COUNT', sequelize.col('*')), 'count']],
      include: [{
        model: db.Note,
        where: { visible: 1 },
        attributes: [],
      }],
      group: ['name'],
    });
    return res.json(category);
  } catch (e) {
    console.error(e);
    return next(e);
  }
});

// GET /category/all(/{$page})
router.get('/all(/:page([0-9]*))?', async (req, res, next) => {
  try {
      let categories = null;
      if (!req.params.page) {
        noteCategories = await db.Category.findAndCountAll({
          order: [['createdAt', 'DESC']],
        });
      } else {
        const limit = 10;
        let offset = 0;
        if (parseInt(req.params.page, 10) > 1) {
          offset = limit * (parseInt(req.params.page, 10) - 1);
        }
        categories = await db.Category.findAndCountAll({
          order: [['createdAt', 'DESC']],
          limit,
          offset,
        });
        if (parseInt(req.params.page, 10) > Math.ceil(parseInt(categories.count, 10) / limit)) {
          return res.status(404).json({ 
            lastPage: Math.ceil(parseInt(categories.count, 10) / limit),
            message: 'This page has no categories.',
          });
        }
      }
      return res.json(categories);
  } catch (e) {
    console.error(e);
    return next(e);
  }
});

// GET /category/({$page})
router.get('/(:page([0-9]*))?', async (req, res, next) => {
  try {
      let noteCategories = null;
      let where = {
          visible: 1,
      };
      if (!req.params.page) {
        categories = await db.Category.findAll({
          where,
          order: [['createdAt', 'DESC']],
          attributes: [
            'id',
            'name',
            [sequelize.fn('COUNT', sequelize.col('title')), 'count'],
          ],
          include: [{
            model: db.Note,
            attributes: [],
          }],
          group: ['id'],
        });
      } else {
        const limit = 10;
        let offset = 0;
        if (parseInt(req.params.page, 10) > 1) {
          offset = limit * (parseInt(req.params.page, 10) - 1);
        }
        categories = await db.Category.findAndCountAll({
          where,
          order: [['createdAt', 'DESC']],
          limit,
          offset,
        });
        if (parseInt(req.params.page, 10) > Math.ceil(parseInt(categories.count, 10) / limit)) {
          return res.status(404).json({ 
            lastPage: Math.ceil(parseInt(categories.count, 10) / limit),
            message: 'This page has no categories.',
          });
        }
      }
      return res.json(categories);
  } catch (e) {
    console.error(e);
    return next(e);
  }
});

router.post('/', isLoggedIn, upload.none(), async (req, res, next) => {
  try {
    const newCategory = await db.Category.create({
      name: req.body.name,
      content: req.body.content,
      visible: req.body.visible,
    });
    const addedCategory = await db.Category.findOne({
      where: { id: newCategory.id },
    });
    return res.json(addedCategory);
  } catch (e) {
    console.log(e);
    next(e);
  }
});

router.patch('/toggle/visible(/:id([0-9]*))', isLoggedIn, async (req, res, next) => {
  try {
    await db.Category.update({
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

router.get('/single(/:id([0-9]*))', async (req, res, next) => {
  try {
    const Category = await db.Category.findOne({
      where: { id: req.params.id },
      order: [['id', 'ASC']],
    });
    if (!Category) {
      return res.status(404).send('There is no note category data.');
    }
    return res.json(Category);
  } catch (e) {
    console.error(e);
    return next(e);
  }
});

router.put('/single', isLoggedIn, upload.none(), async (req, res, next) => {
  try {
    await db.Category.update({
      name: req.body.name,
      content: req.body.content,
      visible: req.body.visible,
    }, {
      where: { id: req.body.id },
    });

    const Category = await db.Category.findOne({
      where: { id: req.body.id },
    });
    return res.json(Category);
  } catch (e) {
    console.log(e);
    next(e);
  }
});

module.exports = router;
