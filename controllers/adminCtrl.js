const Order = require('../model/orderModel');

const getOrders = async (req, res) => {
	try {
		const orders = await Order.find({ status: { $ne: 'completed'} }, null, { sort: { 'createdAt': -1 } })
		.populate('userID', '-password');
		if (req.xhr) {
			console.log('Request from: wep')
	        return res.json(orders)
	    } else {
	    	console.log('Request from: api')
	        return res.render('admin/orders')
	    }
	} catch (err) {
    	console.log(err)
	}
}
const updateStatus = async (req, res) => {
	try {
		const { orderID, status } = req.body
		const order = await Order.findByIdAndUpdate(orderID, { status: status }, {new:true})
		return res.redirect('/admin/orders');
	} catch(err) {
		console.log(err)
		return res.redirect('/admin/orders/status');
	}
}
module.exports = {
	getOrders,
	updateStatus,
}