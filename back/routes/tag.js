const express = require('express');
const multer = require('multer');
const path = require('path');
var Sequelize = require('sequelize'), 
  sequelize = new Sequelize(process.env.DATABASE, process.env.USER_NAME, process.env.DB_PASSWORD, {
    dialect: "mysql", // or 'sqlite', 'postgres', 'mariadb'
    port: 3306, // or 5432 (for postgres)
});

const db = require('../models');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const tag = await sequelize.query(
      `SELECT hashtags.id, hashtags.name, COUNT(hashtags.name) as count
      FROM notes 
      JOIN notehashtag ON notehashtag.NoteId = notes.id
      JOIN hashtags ON hashtags.id = notehashtag.HashtagId
      GROUP BY hashtags.name
      ORDER BY count DESC, id DESC`, {
        nest: true,
      },
    );
    return res.json(tag);
  } catch (e) {
    console.error(e);
    return next(e);
  }
});

router.get('/:tag/:page', async (req, res, next) => {
  try {
    const limit = 10;
    let offset = 0;
    if (parseInt(req.params.page, 10) > 1) {
        offset = limit * (parseInt(req.params.page, 10) - 1);
    }
    
    const count = await sequelize.query(
      `SELECT COUNT(notes.id) as count
      FROM notes
      JOIN notehashtag ON notehashtag.NoteId = notes.id
      JOIN hashtags ON hashtags.id = notehashtag.HashtagId
      WHERE notes.visible = 1 and hashtags.name = '${decodeURIComponent(req.params.tag)}'`, {
        nest: true,
      },
    );
    
    const data = await sequelize.query(
      `SELECT notes.id, notes.title, notes.createdAt, notes.tag, categories.id AS categoryId, categories.name AS categoryName, users.id AS userId
      FROM notes
      JOIN notehashtag ON notehashtag.NoteId = notes.id
      JOIN hashtags ON hashtags.id = notehashtag.HashtagId
      JOIN users ON users.id = notes.UserId
      JOIN categories ON categories.id = notes.CategoryId
      WHERE notes.visible = 1 and hashtags.name = '${decodeURIComponent(req.params.tag)}'
      ORDER BY notes.id DESC
      LIMIT ${limit}
      OFFSET ${offset}`, {
        nest: true,
      },
    );

    const tag = await Promise.all(data.map((v) => {
      try {
        return sequelize.query(
        `SELECT notes.id as noteID, hashtags.id AS hashtagID, hashtags.name hashtagName
        FROM notes 
        JOIN notehashtag ON notehashtag.NoteId = notes.id
        JOIN hashtags ON hashtags.id = notehashtag.HashtagId
        JOIN categories ON notes.categoryID = categories.id 
        WHERE notes.id = ${v.id}`, {
          nest: true,
        });
      } catch (error) {
        console.log(error);
      }
    }));

    const rows = [];
    data.map((v, i) => {
      rows.push({
        id: v.id,
        title: v.title,
        createdAt: v.createdAt,
        category: {
          id: v.categoryId,
          name: v.categoryName,
        },
        user: {
          id: v.userId,
        },
        tag: tag[i].map((x) => {
          return { id: x.hashtagID, name: x.hashtagName, count: x.count };
        }),
      });
    });

    const result = {
      count: count[0].count,  
      rows: [...rows],
    };

    return res.json(result);
  } catch (e) {
    console.error(e);
    return next(e);
  }
});

module.exports = router;
