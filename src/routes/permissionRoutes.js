const express = require('express');
const router = express.Router();
const permissionController = require('../controllers/permissionController');
const authMiddleware = require('../middleware/authMiddleware');
const asyncMiddleware = require('../utils/asyncMiddleware');

router.get('/permissions', 
    authMiddleware.authenticate, 
    asyncMiddleware(authMiddleware.requireRole('super_admin')), 
    asyncMiddleware(permissionController.getAllPermissions)
);

router.post('/permissions', 
    authMiddleware.authenticate, 
    asyncMiddleware(authMiddleware.requireRole('super_admin')), 
    asyncMiddleware(permissionController.createPermission)
);

router.patch('/permissions/:id', 
    authMiddleware.authenticate, 
    asyncMiddleware(authMiddleware.requireRole('super_admin')), 
    asyncMiddleware(permissionController.updatePermission)
);

router.delete('/permissions/:id', 
    authMiddleware.authenticate, 
    asyncMiddleware(authMiddleware.requireRole('super_admin')), 
    asyncMiddleware(permissionController.deletePermission)
);

module.exports = router;
