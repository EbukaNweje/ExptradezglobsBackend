const { deposit } = require("../controllers/depositCon")

const router = require("express").Router()




router.get("/deposit/:id", deposit)


module.exports = router