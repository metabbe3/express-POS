const express = require('express');
const UserController = require('../controllers/userController');
const AuthMiddleware = require('../middlewares/authMiddleware');
const PermissionMiddleware = require('../middlewares/permissionMiddleware');
const asyncMiddleware = require('../utils/asyncMiddleware');

const router = express.Router();

router.post('/', AuthMiddleware.authenticate, asyncMiddleware(PermissionMiddleware.hasPermission('CREATE_USER')), asyncMiddleware(UserController.createUser));
router.put('/:id', AuthMiddleware.authenticate, asyncMiddleware(PermissionMiddleware.hasPermission('UPDATE_USER')), asyncMiddleware(UserController.updateUser));
router.delete('/:id', AuthMiddleware.authenticate, asyncMiddleware(PermissionMiddleware.hasPermission('DELETE_USER')), asyncMiddleware(UserController.deleteUser));

// Move this line up
router.get('/roles-permissions', AuthMiddleware.authenticate, asyncMiddleware(UserController.getUserRolesAndPermissions));

router.get('/:id', AuthMiddleware.authenticate, asyncMiddleware(UserController.getUserById));

module.exports = router;
