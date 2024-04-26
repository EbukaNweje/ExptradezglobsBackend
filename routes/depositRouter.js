const { deposit } = require("../controllers/depositCon")

const router = require("express").Router()




router.post("/deposit/:id", deposit)


module.exports = router