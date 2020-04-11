const express = require('express');
const next = require('next');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const dotenv = require('dotenv');
const path = require('path');
const https = require('https');
const http = require('http');

const dev = process.env.NODE_ENV !== 'production';
const prod = process.env.NODE_ENV === 'production';

const app = next({ dev });
const handle = app.getRequestHandler();
dotenv.config();

app.prepare().then(() => {
    const server = express();

    server.use(morgan('dev'));
    server.use('/', express.static(path.join(__dirname, 'public')));
    server.use(express.json());
    server.use(express.urlencoded({ extended: true }));
    server.use(cookieParser(process.env.COOKIE_SECRET));
    server.use(expressSession({
        resave: false,
        saveUninitialized: false,
        secret: process.env.COOKIE_SECRET,
        cookie: {
            httpOnly: true,
            secure: prod,
        },
    }));

    server.get('/', (req, res) => res.redirect('/note'));

    server.get('/portfolio/main(/:page([0-9]*))', (req, res) => {
        if (req.params.page) {
            return app.render(req, res, '/portfolio/main', { page: req.params.page });
        }
        return res.redirect('/portfolio/main/1');
    });
    server.get('/admin/portfolio(/:page([0-9]*))', (req, res) => {
        if (req.params.page) {
            return app.render(req, res, '/admin/portfolio', { page: req.params.page });
        }
        return res.redirect('/admin/portfolio/1');
    });
    server.get('/admin/portfolio/modify(/:id([0-9]*))', (req, res) => {
        if (req.params.id) {
            return app.render(req, res, '/admin/portfolio/modify', { id: req.params.id });
        }
        return res.redirect('/admin/portfolio/1');
    });

    server.get('/admin/note/category(/:page([0-9]*))', (req, res) => {
        if (req.params.page) {
            return app.render(req, res, '/admin/note/category', { page: req.params.page });
        }
        return res.redirect('/admin/note/category/1');
    });
    server.get('/admin/note/category/modify(/:id([0-9]*))', (req, res) => {
        if (req.params.id) {
            return app.render(req, res, '/admin/note/category/modify', { id: req.params.id });
        }
        return res.redirect('/admin/note/category/1');
    });

    // server.get('/note/:category', (req, res) => {
    //     console.log('category: ', req.params.category);
    // });

    server.get('/note/category/:category/:page([0-9]*)', (req, res) => {
        app.render(req, res, '/note/category', { category: req.params.category, page: req.params.page });
    });

    server.get('/note/category/:category/view/:id([0-9]*)', (req, res) => {
        app.render(req, res, '/note/category/view', { category: req.params.category, id: req.params.id });
    });

    // server.get('/note/:category/():id([0-9]*))', (req, res) => {
    //     console.log('category: ', req.params.category);
    //     console.log('id: ', req.params.id);
    // });

    // server.get('/note/:category(/:id([0-9]*))', (req, res) => app.render(req, res, '/note/:category', { category: req.params.category, id: req.params.id }));

    server.get('/portfolio/detail/:id', (req, res) => app.render(req, res, '/portfolio/detail', { id: req.params.id }));
    server.get('/post/:id', (req, res) => app.render(req, res, '/post', { id: req.params.id }));
    server.get('/hashtag/:tag', (req, res) => app.render(req, res, '/hashtag', { tag: req.params.tag }));
    server.get('/user/:id', (req, res) => app.render(req, res, '/user', { id: req.params.id }));
    server.get('*', (req, res) => handle(req, res));

    if (prod) {
        const lex = require('greenlock-express').create({
            version: 'draft-11',
            configDir: '/etc/letsencrypt', // 또는 ~/letsencrypt/etc
            server: 'https://acme-v02.api.letsencrypt.org/directory',
            email: 'thmsy135@gmail.com',
            store: require('greenlock-store-fs'),
            approveDomains: (opts, certs, cb) => {
                if (certs) {
                    opts.domains = ['thmsy.com', 'www.thmsy.com'];
                } else {
                    opts.email = 'thmsy135@gmail.com';
                    opts.agreeTos = true;
                }
                cb(null, { options: opts, certs });
            },
            renewWithin: 81 * 24 * 60 * 60 * 1000,
            renewBy: 80 * 24 * 60 * 60 * 1000,
        });
        https.createServer(lex.httpsOptions, lex.middleware(server)).listen(443);
        http.createServer(lex.middleware(require('redirect-https')())).listen(80);
    } else {
        server.listen(3060, () => {
            console.log('next + express running on port 3060');
        });
    }
});
