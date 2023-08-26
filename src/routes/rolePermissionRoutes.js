const express = require('express');
const rolePermissionController = require('../controllers/rolePermissionController');
const AuthMiddleware = require('../middlewares/authMiddleware');
const PermissionMiddleware = require('../middlewares/permissionMiddleware');
const asyncMiddleware = require('../utils/asyncMiddleware');

const router = express.Router();

// Assign permission to role
router.post(
    '/roles/:roleId/permissions/:permissionId', 
    AuthMiddleware.authenticate, 
    asyncMiddleware(PermissionMiddleware.hasPermission('ASSIGN_PERMISSION')), 
    asyncMiddleware(rolePermissionController.assignPermissionToRole)
);

// Revoke permission from role
router.delete(
    '/roles/:roleId/permissions/:permissionId', 
    AuthMiddleware.authenticate, 
    asyncMiddleware(PermissionMiddleware.hasPermission('REVOKE_PERMISSION')), 
    asyncMiddleware(rolePermissionController.revokePermissionFromRole)
);

// Get permissions of a role
router.get(
    '/roles/:roleId/permissions', 
    AuthMiddleware.authenticate, 
    asyncMiddleware(rolePermissionController.getRolePermissions)
);
module.exports = router;
