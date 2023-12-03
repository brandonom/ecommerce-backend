const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try {
    const tags = await Tag.findAll({
      include: Product
    })

  }
  catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
    return;

  }
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

router.post("/", async (req, res) => {
  const data = req.body;
  try {
    const tag = await Tag.create(data);

    res.send({ message: "Tag added successfully!" });
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});

router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const newData = req.body;

  try {
    const tag = await Tag.findByPk(id);

    if (!tag) {
      return res.status(404).send({ error: "Tag not found" });
    }

    tag.tag_name = newData.tag_name;

    await tag.save();

    res.send({ message: "Tag updated successfully!" });
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});



router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const tag = await Tag.destroy({
      where: {
        id,
      },
    });

    res.send({
      message: "Tag successfully deleted from the database!",
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
