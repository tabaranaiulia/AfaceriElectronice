const express = require("express");
const bcrypt = require("bcrypt");
const Product = require("../database/models/Product");
const Category = require("../database/models/Category");

const router = express.Router();

router.get("/categories", async (req, res) => {
  const users = await Category.findAll();
  console.log(req);
  res.status(200).json(users);
});

router.post("/addCategory", async (req, res) => {
  const { name, tags } = req.body;
  console.log(req.body);

  if (!name) {
    return res.status(400).json({ error: "Category name is required" + name });
  }

  try {
    const newCategory = await Category.create({ name, tags });
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/addProduct", async (req, res) => {
  const { name, price, CategoryId } = req.body;
  console.log(req.body);

  if (!name || !price || !CategoryId) {
    return res
      .status(400)
      .json({ error: "Product name, price, and CategoryId are required" });
  }

  try {
    const newProduct = await Product.create({ name, price, CategoryId });
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/", async (req, res) => {
  const { category } = req.query;
  console.log(req.userId);
  console.log(category);

  try {
    let products;
    if (category) {
      const categoryRecord = await Category.findOne({
        where: { name: category },
      });
      if (!categoryRecord) {
        return res.status(404).json({ error: "Category not found" });
      }
      products = await Product.findAll({
        where: { CategoryId: categoryRecord.id },
      });
    } else {
      products = await Product.findAll();
    }
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
