
const router = require('express').Router();
const categoryController = require('../controller/categoryController');
const authAdmin = require('../middlewares/authAdmin');
const auth = require('../middlewares/auth');

router.get('/',categoryController.getCategory)
router.post('/',auth,authAdmin,categoryController.createCategory)
router.delete('/:id',auth,authAdmin,categoryController.deleteCategory)
router.put('/:id',auth,authAdmin,categoryController.updateCategory)

module.exports = router;