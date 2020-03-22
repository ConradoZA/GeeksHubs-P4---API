const router = require('express').Router();
const AuthorController = require('../controllers/AuthorController.js');

router.get('/', AuthorController.getAll);
router.get('/:id', AuthorController.getOne);
router.post('/many', AuthorController.insertMany);
router.post('/', AuthorController.insert);
router.put('/:id', AuthorController.put);
router.delete('/:id', AuthorController.delete);

module.exports = router;