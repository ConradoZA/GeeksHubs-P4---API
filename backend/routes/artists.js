const router = require('express').Router();
const ArtistController = require('../controllers/ArtistController.js');

router.get('/', ArtistController.getAll);
router.get('/:id', ArtistController.getOne);
router.post('/many', ArtistController.insertMany);
router.post('/', ArtistController.insert);
router.put('/:id', ArtistController.put);
router.delete('/:id', ArtistController.delete);

module.exports = router;