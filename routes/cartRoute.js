const { Router } = require("express");
const route = Router();

const {
    cartPage,
    updateCart,
    removeItem,
    removeAll,
    ordersStore,
    ordersPage,
    orderStatus,
} = require('../controllers/cartCtrl');

const auth = require('../middlewares/auth');

route.post('/update-cart', updateCart);
route.post('/remove-item', removeItem);
route.post('/orders', auth, ordersStore);

route.get('/', cartPage);
route.get('/remove-all', removeAll);
route.get('/customers/orders', auth, ordersPage);
route.get('/customers/orders/:id', auth, orderStatus);





module.exports = route