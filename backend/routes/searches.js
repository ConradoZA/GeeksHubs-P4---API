const router = require('express').Router();
const SearchController = require('../controllers/SearchController.js');

router.get('/game=:game', SearchController.getByName);
router.get('/year=:year', SearchController.getByYear);
router.get('/players=:player', SearchController.getByPlayers);
router.get('/mechanic=:mechanic', SearchController.getMechanicByName);
router.get('/type=:type', SearchController.getTypeByName);
router.get('/author=:author', SearchController.getAuthorByName);
router.get('/artist=:artist', SearchController.getArtistByName);
router.get('/minus/:time', SearchController.getByTimeMinus);
router.get('/plus/:time', SearchController.getByTimePlus);
router.get('/age=:age', SearchController.getByAge);


module.exports = router;