const { Router } = require("express");
const route = Router();

const {
    homePage,
    newMedicine
} = require('../controllers/homeCtrl');

route.get('/', homePage);
route.post('/new-medicine', newMedicine);

module.exports = route