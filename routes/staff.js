const express = require('express');
const router = express.Router();
const validation = require('../middleware/validate.js');
const staffController = require('../controllers/staff.js');
const { isAuthenticated } = require('../middleware/authenticate.js');

router.get('/', staffController.getAllStaff);
router.get('/:id', staffController.getSingleStaff);
router.post('/', isAuthenticated, validation.staff, staffController.createStaff);
router.put('/:id',isAuthenticated, validation.staff, staffController.updateStaff);
router.delete('/:id', isAuthenticated, staffController.deleteStaff);

module.exports = router;