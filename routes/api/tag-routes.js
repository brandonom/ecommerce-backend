const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try{
    const tags = await Tag.findAll({
      include: Product
    })

  }
  // find all tags
  // be sure to include its associated Product data
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const tag = await Tag.findByPk(id, {
      include: Product,
    });

    if (tag) {
      res.send(tag);
      return;
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
    return;
  }

  res.status(404).send("Tag not found");
});

router.post('/', (req, res) => {
  // create a new tag
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
});

module.exports = router;
