const Product = require("../models/Product");
const User = require("../models/User");

const ProductController = {
  async createProduct(req, res) {
    try {
      const product = await Product.create(req.body);
      res.status(201).send(product);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ msg: "Ha habido un problema creando el producto", error });
    }
  },
  async getAll(req, res) {
    try {
      // const { page = 1, limit = 10 } = req.query;

      const products = await Product.find()
        .populate("reviews.userId")
        .limit(req.query.limit)
        .skip((req.query.page - 1) * req.query.limit);
      res.send(products);
    } catch (error) {
      console.error(error);
      res.status(500).send({
        msg: "Ha habido un problema al traernos los productos",
        error,
      });
    }
  },
  async getById(req, res) {
    try {
      const product = await Product.findById(req.params._id);
      res.send(product);
    } catch (error) {
      console.error(error);
      res.status(500).send({
        msg: "Ha habido un problema al traernos el producto",
        error,
      });
    }
  },
  async getProductsByName(req, res) {
    try {
      //   if (req.params.name.length > 20) {
      //     return res.status(400).send("Búsqueda demasiado larga");
      //   }
      //   const name = new RegExp(req.params.name, "i"); //como el Op like de sequelize
      //   const products = await Product.find({ name });
      const products = await Product.find({
        $text: {
          $search: req.params.name,
        },
      });
      res.send(products);
    } catch (error) {
      console.error(error);
      res.status(500).send({
        msg: "Ha habido un problema al traernos los productos",
        error,
      });
    }
  },
  async delete(req, res) {
    try {
      const product = await Product.findByIdAndDelete(req.params._id);
      res.send({ product, message: "Product deleted" });
    } catch (error) {
      console.error(error);
      res.status(500).send({
        message: "there was a problem trying to remove the publication",
      });
    }
  },
  async update(req, res) {
    try {
      const product = await Product.findByIdAndUpdate(
        req.params._id,
        req.body,
        { new: true }
      );
      res.send({ message: "product successfully updated", product });
    } catch (error) {
      console.error(error);
    }
  },
  async insertComment(req, res) {
    try {
      const product = await Product.findByIdAndUpdate(
        req.params._id,
        {
          $push: {
            reviews: { comment: req.body.comment, userId: req.user._id },
          },
        },
        { new: true }
      );
      res.send({ msg: "gracias por tu comentario", product });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "There was a problem with your review" });
    }
  },
  //hace dos funciones
    async like(req, res) {
    try {
      //añadimos like al producto
      const product = await Product.findByIdAndUpdate(
        req.params._id,
        { $push: { likes: req.user._id } },// pusheo el id del usuario logueado
        { new: true }
      );
    //añadimos producto a la lista de deseos del usuario
      await User.findByIdAndUpdate(
        req.user._id,
        { $push: { wishList: req.params._id } },//pusheo el id del producto que he dado like
        { new: true }
      );

      res.send(product);
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "There was a problem with your like" });
    }
  },

};

module.exports = ProductController;
