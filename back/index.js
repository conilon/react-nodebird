const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const dotenv = require('dotenv');
const passport = require('passport');
const hpp = require('hpp');
const helmet = require('helmet');
const https = require('https');
const http = require('http');

const passportConfig = require('./passport');
const db = require('./models');
const userAPIRouter = require('./routes/user');
const postAPIRouter = require('./routes/post');
const postsAPIRouter = require('./routes/posts');
const hashtagAPIRouter = require('./routes/hashtag');

// portfolio
const portfolioAPIRouter = require('./routes/portfolio');
const portfoliosAPIRouter = require('./routes/portfolios');

// note
const noteAPIRouter = require('./routes/note');
const categoryAPIRouter = require('./routes/category');

// admin
const adminAPIRouter = require('./routes/admin');

// tag
const tagAPIRouter = require('./routes/tag');

const prod = process.env.NODE_ENV === 'production';

dotenv.config();
const app = express();
db.sequelize.sync();
passportConfig();

if (prod) {
    app.use(hpp());
    app.use(helmet());
    app.use(morgan('combined'));
    app.use(cors({
        origin: /thmsy\.com$/,
        credentials: true,
    }));
} else {
    app.use(morgan('dev'));
    app.use(cors({
        origin: true,
        credentials: true,
    }));
}

app.use('/', express.static('uploads'));
app.use('/note', express.static('uploads/note'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(expressSession({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true,
        secure: prod, // https를 쓸 때 true로 한다. 
        domain: prod && '.thmsy.com',
    },
    name: 'rnbck'
}));
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
    res.send('THMSY 백엔드 정상 동작!');
});

// API는 다른 서비스가 내 서비스의 기능을 실행할 수 있게 열여둔 창구
app.use('/api/user', userAPIRouter);
app.use('/api/post', postAPIRouter);
app.use('/api/posts', postsAPIRouter);
app.use('/api/hashtag', hashtagAPIRouter);

// portfolio
app.use('/api/portfolio', portfolioAPIRouter);
app.use('/api/portfolios', portfoliosAPIRouter);

// note
app.use('/api/note', noteAPIRouter);
app.use('/api/category', categoryAPIRouter);

// admin
app.use('/api/admin', adminAPIRouter);

// tag
app.use('/api/tag', tagAPIRouter);

if (prod) {
    const lex = require('greenlock-express').create({
        version: 'draft-11',
        configDir: '/etc/letsencrypt', // 또는 ~/letsencrypt/etc
        server: 'https://acme-v02.api.letsencrypt.org/directory',
        email: 'thmsy135@gmail.com',
        store: require('greenlock-store-fs'),
        approveDomains: (opts, certs, cb) => {
            if (certs) {
                opts.domains = ['api.thmsy.com'];
            } else {
                opts.email = 'thmsy135@gmail.com';
                opts.agreeTos = true;
            }
            cb(null, { options: opts, certs });
        },
        renewWithin: 81 * 24 * 60 * 60 * 1000,
        renewBy: 80 * 24 * 60 * 60 * 1000,
    });
    https.createServer(lex.httpsOptions, lex.middleware(app)).listen(443);
    http.createServer(lex.middleware(require('redirect-https')())).listen(80);
} else {
    app.listen(3065, () => {
        console.log('server is running on port http://localhost:3065');
    });
}
