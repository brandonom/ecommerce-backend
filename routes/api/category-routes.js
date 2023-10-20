const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try{
    const category = await Category.findAll({
      include: [Product]
    
    });
    if (!category){
      res.status(404).json({message: 'no categories found.'})
      return;
    }
    res.status(200).json(category);
  } catch (err) {
    res.status(500).json(err);
  }

});

router.get('/:id', async (req, res) => {
  try{
    const categoryId = await Category.findByPk(req.params.id);
    if (!categoryId){
      res.status(404).json({message: 'no category with this id.'});
      return;
    }
    res.status(200).json(categoryId);
  } catch (err) {
    res.status(500).json(err);
  }
  
});

router.post('/', (req, res) => {
  try {
    const newCategory= Category.create(req.body)
    if(!newCategory){
    res.status(404).json({message: 'cannot create this category.'});
    return;
    }
  }

});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
