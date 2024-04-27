
const router = require("express").Router()

const { makeInvestment } = require("../controllers/investController")





router.post("/invest/:id", makeInvestment)

module.exports = router