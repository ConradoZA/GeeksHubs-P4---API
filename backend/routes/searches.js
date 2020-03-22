const router = require('express').Router();
const SearchController = require('../controllers/SearchController.js');

router.get('/game=:game', SearchController.getByName);
router.get('/year=:year', SearchController.getByYear);
router.get('/players=:player', SearchController.getByPlayers);
router.get('/mechanic/mechanic=:mechanic', SearchController.getMechanicByName);
router.get('/mechanic/:id', SearchController.getMechanicById);
router.get('/type/type=:type', SearchController.getTypeByName);
router.get('/type/:id', SearchController.getTypeById);
router.get('/author=:author', SearchController.getAuthorByName);
router.get('/author/:id', SearchController.getAuthorById);
router.get('/artist=:artist', SearchController.getArtistByName);
router.get('/artist/:id', SearchController.getArtistById);
router.get('/time-=:time', SearchController.getByTimeMinus);
router.get('/time+=:time', SearchController.getByTimePlus);
router.get('/age=:age', SearchController.getByAge);


module.exports = router;