const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// get all tags
router.get('/', async (req, res) => {
  try {
    const tags = await Tag.findAll({
      attributes: ['id', 'tag_name'],
      include: [
        {
          model: Product,
          attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
        },
      ],
    });
    res.json(tags);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// get one tag
router.get('/:id', async (req, res) => {
  try {
    const tag = await Tag.findOne({
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
    if (tag === null) {
      res.status(404).json({ err: 'Tag not found!' });
    } else {
      res.json(tag);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// create new tag
router.post('/', async (req, res) => {
  try {
    const tag = await Tag.create({
      tag_name: req.body.tag_name,
    });
    res.json(tag);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// update tag
router.put('/:id', async (req, res) => {
  try {
    const tag = await Tag.update(req.body, {
      where: { id: req.params.id },
    });
    if (!tag[0]) {
      res.status(404).json({ err: 'Tag not found!' });
    } else {
      res.json(tag);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// delete tag
router.delete('/:id', async (req, res) => {
  try {
    const tag = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!tag) {
      res.status(404).json({ err: 'Tag not found!' });
    } else {
      res.json(tag);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
