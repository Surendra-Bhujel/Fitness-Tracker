const router = require('express').Router();
const adminController = require('../controllers/adminController');
const { adminAuth, checkPermission } = require('../middleware/adminAuth');

router.post('/login', adminController.adminLogin);
router.post('/create', adminController.createAdmin);
router.post('/reset-password', adminController.resetAdminPassword);

router.get('/users', adminAuth, checkPermission('manage_users'), adminController.getAllUsers);
router.delete('/users/:id', adminAuth, checkPermission('manage_users'), adminController.deleteUser);

router.get('/analytics', adminAuth, adminController.getAnalytics);

module.exports = router;