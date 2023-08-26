const express = require('express');
const roleController = require('../controllers/roleController');
const AuthMiddleware = require('../middlewares/authMiddleware');
const PermissionMiddleware = require('../middlewares/permissionMiddleware');
const asyncMiddleware = require('../utils/asyncMiddleware');

const router = express.Router();

router.get('/', AuthMiddleware.authenticate, asyncMiddleware(roleController.getAllRoles));
router.post('/', AuthMiddleware.authenticate, asyncMiddleware(PermissionMiddleware.hasPermission('CREATE_ROLE')), asyncMiddleware(roleController.createRole));
router.put('/:id', AuthMiddleware.authenticate, asyncMiddleware(PermissionMiddleware.hasPermission('UPDATE_ROLE')), asyncMiddleware(roleController.updateRole));
router.delete('/:id', AuthMiddleware.authenticate, asyncMiddleware(PermissionMiddleware.hasPermission('DELETE_ROLE')), asyncMiddleware(roleController.deleteRole));

module.exports = router;
