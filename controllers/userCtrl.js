const User = require('../model/userModel');
const { hash } = require('bcrypt');

// Login
const loginPage = (req, res) => {
    res.render("auth/login")
}

const logoutUser = async (req, res) => {
    req.logOut((err) => {
        if (err) {
            console.log(err)
            return res.redirect('logout')
        }
        return res.redirect('/user/login')
    });
}

// Register
const registerPage = (req, res) => {
    res.render("auth/register")
}
const createUser = async (req, res) => {
    const { userName, email, age, phone, password } = req.body;
    const userDB = await User.findOne({ email });
    if (!userDB){
        await new User({
            userName,
            email,
            age,
            phone,
            password: await hash(password, 10)
        }).save()
        console.log(req.body)
        res.redirect("/user/login")
    } else {
        res.send('<h1>This email are exists</h1> <button><a href="/user/register">Try again</a></button>')
    }
}

module.exports = {
    loginPage,
    registerPage,
    createUser,
    logoutUser,
}