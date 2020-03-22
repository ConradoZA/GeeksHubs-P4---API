const router = require('express').Router();
const MechanicController = require('../controllers/MechanicController.js');

router.get('/', MechanicController.getAll);
router.get('/:id', MechanicController.getOne);
router.post('/many', MechanicController.insertMany);
router.post('/', MechanicController.insert);
router.put('/:id', MechanicController.put);
router.delete('/:id', MechanicController.delete);

module.exports = router;