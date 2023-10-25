const Order = require('../model/orderModel')
const cartPage = (req, res) => {
    res.render("customer/cartPage")
}
const updateCart = (req, res) => {
/* Cart structure in session
    let cart = {
        items: {
            medicineID-1: { item: medicineObject, qty:0 }
            medicineID-2: { item: medicineObject, qty:0 }
            medicineID-3: { item: medicineObject, qty:0 }
        },
        totlaQty: 0,
        totalPrice: 0
    }
*/
    if (!req.session.cart) {
        req.session.cart = {
            items: {},
            totalQty: 0,
            totalPrice: 0
        }
    }
    let cart = req.session.cart;
    if (!cart.items[req.body._id]) {
        cart.items[req.body._id] = {
            item: req.body,
            qty: 1,
        }
        cart.totalQty = cart.totalQty +1; 
        cart.totalPrice = cart.totalPrice + req.body.price
    } else {
        cart.items[req.body._id].qty = cart.items[req.body._id].qty +1;
        cart.totalQty = cart.totalQty + 1;
        cart.totalPrice = cart.totalPrice + req.body.price;
    }
    res.json({ totalQty: req.session.cart.totalQty })
}
const removeItem = (req, res) => {
    let medicineID = req.body.medicineID;
    medicineID = JSON.parse(medicineID);
    let cart = req.session.cart;
    // Check if the item exists in the cart before trying to access its properties
    if (cart.items[medicineID]) {
        let itemPrice = cart.items[medicineID].item.price;
        let itemQty = cart.items[medicineID].qty;
        delete cart.items[medicineID];
        cart.totalQty -= itemQty;
        cart.totalPrice -= itemPrice * itemQty; // Multiply the item's price by its quantity
        console.log(`Deleted ${medicineID}`);
        if (Object.keys(cart.items).length === 0) {
            delete req.session.cart;
        }
    } else {
        console.log(`Item with id ${medicineID} not found in the cart.`);
    }
    res.redirect('/cart');
}
const removeAll = (req, res) => {
    delete req.session.cart
    res.redirect('/')
}
const ordersStore = (req, res) => {
    const newOrder = new Order(
        {
            userID: req.user._id,
            items: req.session.cart.items,
            phone: req.body.phone,
            address: req.body.address,
        }
    ).save().then(async (result) => {
        await Order.populate(result, { path: 'userID' });
        delete req.session.cart;
        return res.redirect('/cart/customers/orders')
    }).catch((err) => {
        console.log(err)
        return res.redirect('/cart')
    })
}
const ordersPage = async (req, res) => {
    const orders = await Order.find({ userID: req.user._id }, null, { sort: { 'createdAt': -1 } });
    res.render('customer/orders', { orders })
}
const orderStatus = async (req, res) => {
    const { id } = req.params;
    const order = await Order.findById(id);
    console.log(order)
    res.render('customer/orderStatus', { order })
}

module.exports = {
    cartPage,
    updateCart,
    removeItem,
    removeAll,
    ordersStore,
    ordersPage,
    orderStatus,
}