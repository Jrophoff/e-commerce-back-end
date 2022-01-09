const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// get all categories
router.get('/', async (req, res) => {
  try {
    const categories = await Category.findAll({
      attributes: ['id', 'category_name'],
      include: [
        {
          model: Product,
          attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
        },
      ],
    });
    res.json(categories);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// get one category
router.get('/:id', async (req, res) => {
  try {
    const category = await Category.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: Product,
          attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
        },
      ],
    });
    if (category === null) {
      res.status(404).json({ err: 'Category not found!' });
    } else {
      res.json(category);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// create new category
router.post('/', async (req, res) => {
  try {
    const category = await Category.create({
      category_name: req.body.category_name,
    });
    res.json(category);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// update category
router.put('/:id', async (req, res) => {
  try {
    const category = await Category.update(req.body, {
      where: { id: req.params.id },
    });
    if (!category[0]) {
      res.status(404).json({ err: 'Category not found!' });
    } else {
      res.json(category);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// delete category
router.delete('/:id', async (req, res) => {
  try {
    const category = await Category.destroy({
      where: {
        id: req.params.category_id,
      },
    });
    if (!category) {
      res.status(404).json({ err: 'Category not found!' });
    } else {
      res.json(category);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
