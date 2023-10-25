const { Strategy } = require('passport-local');
const User = require('../model/userModel');
const { compare } = require('bcrypt');

function passportConfig(passport) {
    passport.use(new Strategy({ usernameField: 'email' }, async (email, password, done) => {
        const userDB = await User.findOne({ email });
        if (!userDB) {
            return done(null, false);
        }
        compare(password, userDB.password)
	        .then((match) => {
	        	if (match) {
	        		return done(null, userDB)
	        	} else {
	        		return done(null, false)
	        	}
	        })
	        .catch(err => done(err, false))
    }))
    passport.serializeUser((userDB, done) => done(null, userDB._id))
    passport.deserializeUser( async (id, done) => {
        const userDB = await User.findById(id);
        done(null, userDB);
    })
}
module.exports = passportConfig