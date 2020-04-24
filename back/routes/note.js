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

router.post('/upload', upload.single('file'), (req, res, next) => {
  const url = prod ? `https://api.thmsy.com/note/` : `http://localhost:3065/note/`
  const info = {
    originalname: decodeURIComponent(req.file.originalname),
    filename: decodeURIComponent(req.file.originalname),
    url: url + `${req.file.filename}`,
    thumbUrl: url + `${req.file.filename}`,
  }
  return res.json(info);
});

router.post('/', upload.none(), async (req, res, next) => {
  try {
    const category = await db.Category.findOne({ where: { id: req.body.category } });
    const newNote = await db.Note.create({
      title: req.body.title,
      content: req.body.content,
      tag: req.body.tag,
      visible: req.body.visible,
      UserId: 3,
    });
    const hashtags = req.body.tag.match(/(#[\d|\s|A-Z|a-z|ㄱ-ㅎ|ㅏ-ㅣ|가-힣]*)/g);
    if (hashtags) {
      const result = await Promise.all(hashtags.map((tag) => db.Hashtag.findOrCreate({ 
        where: { name: tag.slice(1).toLowerCase().trim(), },
      })));
      await newNote.addHashtags(result.map(r => r[0]));
    }
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

router.post('/edit', upload.none(), async (req, res, next) => {
  try {
    await sequelize.query(`DELETE FROM notehashtag WHERE NoteId = '${req.body.id}'`);
    const updateNote = await db.Note.update({
      title: req.body.title,
      content: req.body.content,
      tag: req.body.tag,
      visible: req.body.visible,
      CategoryId: req.body.category,
      UserId: 3,
    }, {
      where: { id: req.body.id },
    });

    const selectNote = await db.Note.findOne({ where: { id: req.body.id } });
    const hashtags = req.body.tag.match(/(#[\d|\s|A-Z|a-z|ㄱ-ㅎ|ㅏ-ㅣ|가-힣]*)/g);
    if (hashtags) {
      const result = await Promise.all(hashtags.map((tag) => db.Hashtag.findOrCreate({ 
        where: { name: tag.slice(1).toLowerCase().trim(), },
      })));
      await selectNote.addHashtags(result.map(r => r[0]));
    }

    return res.json(selectNote);
  } catch (e) {
    console.log(e);
    next(e);
  }
});

// router.delete('/:id', isLoggedIn, async (req, res, next) => {
//   try {
//     const post = await db.Post.findOne({ where: { id: req.params.id } });
//     if (!post) {
//       return res.status(404).send('포스트가 존재하지 않습니다.');
//     }
//     await db.Post.destroy({ where: { id: req.params.id } });
//     return res.send(req.params.id);
//   } catch (e) {
//     console.error(e);
//     return next(e);
//   }
// });

router.get('/category/:category/:page', async (req, res, next) => {
  try {
    const limit = 24;
    let offset = 0;
    if (parseInt(req.params.page, 10) > 1) {
      offset = limit * (parseInt(req.params.page, 10) - 1);
    }
    const categoryId = await db.Category.findOne({
      where: { name: decodeURIComponent(req.params.category), visible: 1 },
      attributes: ['id'],
    });

    const count = await sequelize.query(
      `SELECT COUNT(*) as count
      FROM notes
      JOIN categories ON categories.id = notes.CategoryId
      WHERE notes.visible = 1 and notes.categoryId = '${categoryId.id}'`, {
        nest: true,
      },
    );
        
    const data = await sequelize.query(
      `SELECT notes.id, notes.title, DATE_ADD(notes.createdAt, INTERVAL 9 HOUR) AS createdAt, 
      categories.id AS categoryId, categories.name AS categoryName, users.id AS userId
      FROM notes
      JOIN users ON users.id = notes.UserId
      JOIN categories ON categories.id = notes.CategoryId
      WHERE notes.visible = 1 and notes.categoryId = '${categoryId.id}'
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
    
    if (!result) {
      return res.status(404).send('note is empty.');
    }

    if (req.params.page > Math.ceil(count[0].count / limit)) {
      return res.status(404).json({ 
        lastPage: Math.ceil(count[0].count / limit),
        message: 'note is empty.',
      });
    }

    return res.json(result);
  } catch (e) {
    console.error(e);
    return next(e);
  }
});

router.get('/view/:id', async (req, res, next) => {
  try {
    // const categoryId = await db.Category.findOne({
    //   where: { name: decodeURIComponent(req.params.category), visible: 1 },
    //   attributes: ['id'],
    // });

    console.log('req.params.id: ', req.params.id);

    const note = await db.Note.findOne({
      // where: { id: req.params.id, visible: 1, CategoryId: categoryId.id },
      where: { id: req.params.id, visible: 1 },
      attributes: ['id', 'title', 'content',
        [sequelize.literal('DATE_ADD(Note.createdAt, INTERVAL 9 HOUR)'), 'createdAt'],
      ],
      include: [{
        where: { visible: 1 },
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

        // category.map((v) => {
        //     v.Notes = [];
        //     note.map((z) => {
        //         if (v.id === z.CategoryId) {
        //             v.Notes.push(z);
        //         }
        //     });
        // });
        
        category.map((v) => {
          v.Notes = [];
          note.filter((x) => v.id === x.CategoryId).map((z) => {
            return v.Notes.push(z);
          });
        });

        return res.json(category);
    } catch (e) {
        console.error(e);
        return next(e);
    }
});

router.get('/tag', async (req, res, next) => {
    try {
        const tag = await sequelize.query(
            `SELECT hashtags.name, COUNT(hashtags.name) as count
            FROM notes 
            JOIN notehashtag ON notehashtag.NoteId = notes.id
            JOIN hashtags ON hashtags.id = notehashtag.HashtagId
            GROUP BY hashtags.name`, {
                nest: true,
            },
        );
        return res.json(tag);
    } catch (e) {
        console.error(e);
        return next(e);
    }
});

module.exports = router;
