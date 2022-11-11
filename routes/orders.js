const express = require("express")
const OrderController = require("../controllers/OrderController");
const { authentication, isAuthor } = require("../middlewares/authentication");
const router = express.Router()

router.post("/createOrder",authentication, OrderController.create)
router.put("/updateOrderById/:_id",authentication,isAuthor, OrderController.update)

module.exports = router;