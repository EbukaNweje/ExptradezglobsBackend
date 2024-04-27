
const router = require("express").Router()

const { makeInvestment } = require("../controllers/investController")





router.get("/invest/:id", makeInvestment)

module.exports = router