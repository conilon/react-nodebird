const passport = require('passport');
const db = require('../models');

module.exports = () => {
    passport.serializeUser((user, done) => { // 서버쪽에 [{ id: 3, cookie: 'asdfgh' }]
        return done(null, user.id);
    });

    passport.deserializeUser(async(id, done) => {
        try {
            const user = await db.User.findeOne({
                where: { id },
            });
            return done(null, user); // req.user
        } catch (e) {
            console.error(e);
            return done(e);
        }
    });
};
