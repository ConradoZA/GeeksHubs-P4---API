const router = require('express').Router();
const TypeController = require('../controllers/TypeController.js');

router.get('/', TypeController.getAll);
router.get('/:id', TypeController.getOne);
router.post('/', TypeController.insert);
router.post('/many', TypeController.insertMany);
router.put('/:id', TypeController.put);
router.delete('/:id', TypeController.delete);

module.exports = router;