const productController = require('../controller/productController');
const auth = require('../middlewares/auth');
const authAdmin = require('../middlewares/authAdmin');

const router = require('express').Router();

router.get('/',productController.getProducts)
router.post('/',auth, authAdmin ,productController.createProducts)
router.route('/:id')
    .delete(auth, authAdmin, productController.deleteProducts)
    .put(auth, authAdmin, productController.updateProducts)
module.exports = router;