const router = require("express").Router()
const { confirmDeposit } = require("../controllers/Admin")


router.post('/confirm-deposit/:depositId', confirmDeposit)

module.exports = router
