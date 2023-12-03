const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    const category = await Category.findAll({
      include: [Product]

    });
    if (!category) {
      res.status(404).json({ message: 'no categories found.' })
      return;
    }
    res.status(200).json(category);
  } catch (err) {
    res.status(500).json(err);
  }

});

router.get('/:id', async (req, res) => {
  try {
    const categoryId = await Category.findByPk(req.params.id);
    if (!categoryId) {
      res.status(404).json({ message: 'no category with this id.' });
      return;
    }
    res.status(200).json(categoryId);
  } catch (err) {
    res.status(500).json(err);
  }

});

router.post('/', (req, res) => {
  try {
    const newCategory = Category.create(req.body)
    if (!newCategory) {
      res.status(404).json({ message: 'cannot create this category.' });
      return;
    }
  } catch (err) {
    res.status(500).json(err);
  }

});

router.put('/:id', async (req, res) => {
  const id = req.params.id;
  const newData = req.body;

  try {
    const category = await Category.findByPk(id);

    if (!category) {
      return res.status(404).send({ error: "Category not found" });
    }

    category.category_name = newData.category_name;

    await category.save();

    res.send({ message: "Category updated successfully!" });
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});

router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const category = await Category.destroy({
      where: {
        id,
      },
    });
    res.send({
      message: "Category deleted from database!",
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
