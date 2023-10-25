const { Router } = require("express");
const passport = require('passport');
const route = Router();

const {
    loginPage,
    registerPage,
    createUser,
    logoutUser,
} = require('../controllers/userCtrl');

const auth = require('../middlewares/auth');
const guest = require('../middlewares/guest');

route.get('/login', guest, loginPage);
route.post('/login', passport.authenticate('local', { successRedirect: '/', failureRedirect: '/user/login' }));


route.get('/register', guest, registerPage);
route.post('/register', createUser);

route.post('/logout', logoutUser);

module.exports = route