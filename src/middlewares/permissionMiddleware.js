const UserModel = require('../models/UserModel');
const { errorResponse } = require('../utils/responseUtils');

module.exports = {
    async hasPermission(requiredPermission) {
        return async (req, res, next) => {
            //console.log("Entered hasPermission middleware");
            try {
                const user = req.user;
                if (!user) throw new Error("User not found in request.");
    
                //console.log("Checking user permissions");
const permissions = await UserModel.getPermissions(user.id);
//console.log("Fetched permissions:", permissions);

if (!permissions.includes(requiredPermission)) {
    console.log("Permission denied for:", requiredPermission);
    throw new Error("Permission denied");
}

console.log("Permission granted, moving to next middleware/controller");
next();

            } catch (error) {
                console.error("Error in hasPermission middleware: ", error);
                errorResponse(res, "Permission denied", 403);
            }
        };
    }
    
};
