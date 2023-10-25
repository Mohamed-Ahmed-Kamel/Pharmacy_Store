const { Router } = require("express");
const route = Router();
const {
    getOrders,
    updateStatus
} = require('../controllers/adminCtrl');
const admin = require('../middlewares/admin')
// Admen Routes
route.get('/orders', admin, getOrders)
route.post('/orders/status', admin, updateStatus)

module.exports = route