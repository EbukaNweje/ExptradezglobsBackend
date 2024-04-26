
const router = require("express").Router()

const { makeInvestment } = require("../controllers/investController")





router.get("/invest/:userId", makeInvestment)

module.exports = router