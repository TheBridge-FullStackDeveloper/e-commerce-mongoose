const express = require("express")
const ProductController = require("../controllers/ProductController")
const { authentication, isAdmin } = require("../middlewares/authentication")
const router = express.Router()

router.post("/createProduct",authentication,isAdmin, ProductController.createProduct)
router.get("/getAllProducts",ProductController.getAll)
router.get("/getById/:_id",ProductController.getById)
router.get("/getProductsByName/:name",ProductController.getProductsByName)
router.delete("/deleteProductById/:_id",authentication,isAdmin,ProductController.delete)
router.put("/updateProductById/:_id",authentication,isAdmin,ProductController.update)

module.exports = router