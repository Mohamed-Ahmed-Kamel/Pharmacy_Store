const Medicine = require("../model/medicineModel")

const homePage = async (req, res) => {
    const medicines = await Medicine.find();
    res.render("home", { medicines })
}
const newMedicine = async (req, res) => {
    const newMedicine = await Medicine.create(req.body)
    res.json(newMedicine)
}
module.exports = {
    homePage,
    newMedicine,
}