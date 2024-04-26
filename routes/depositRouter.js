const { deposit } = require("../controllers/depositCon")

const router = require("express").Router()




router.get("/deposit/:userId", deposit)


module.exports = router