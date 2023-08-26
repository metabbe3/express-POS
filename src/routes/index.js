const express = require('express');
const userRoutes = require('./usersRoutes');
const roleRoutes = require('./roleRoutes'); // import role routes
const rolePermissionRoutes = require('./rolePermissionRoutes'); // import role permission routes
const authRoutes = require('./authRoutes'); // Make sure the path is correct


const router = express.Router();

router.use('/users', userRoutes);
router.use('/roles', roleRoutes); // add role routes
router.use('/role-permissions', rolePermissionRoutes); // add role-permission routes
router.use('/auth', authRoutes);

module.exports = router;
