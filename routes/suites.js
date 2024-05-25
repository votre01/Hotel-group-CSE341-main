const express = require('express');
const router = express.Router();
const validation = require('../middleware/validate');
const suitesController = require('../controllers/suites');
const { isAuthenticated } = require('../middleware/authenticate');

router.get('/', suitesController.getAllSuites);
router.get('/:id', suitesController.getSingleSuite);
router.post('/',isAuthenticated, validation.suite, suitesController.createSuite);
router.put('/:id',isAuthenticated, validation.suite, suitesController.updateSuite);
router.delete('/:id',isAuthenticated, suitesController.deleteSuite);

module.exports = router;