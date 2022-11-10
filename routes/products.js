const express = require("express")
const ProductController = require("../controllers/ProductController")
const router = express.Router()

router.post("/createProduct",ProductController.createProduct)
router.get("/getAllProducts",ProductController.getAll)
router.get("/getById/:_id",ProductController.getById)
router.get("/getProductsByName/:name",ProductController.getProductsByName)
router.delete("/deleteProductById/:_id",ProductController.delete)
router.put("/updateProductById/:_id",ProductController.update)

module.exports = router