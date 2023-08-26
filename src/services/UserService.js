const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/UserModel');
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRATION = process.env.JWT_EXPIRATION || '1h';

const UserService = {

    async createUser(userData) {
        if (!userData.password || !userData.email) {
            throw new Error("Both email and password fields are required.");
        }

        userData.password_hash = await bcrypt.hash(userData.password, 10);
        delete userData.password;

        const newUser = await UserModel.create(userData);
        delete newUser.password_hash;

        return newUser;
    },

    async updateUser(userId, updatedData) {
        if (updatedData.password) {
            updatedData.password_hash = await bcrypt.hash(updatedData.password, 10);
            delete updatedData.password;
        }

        const updatedUser = await UserModel.update(userId, updatedData);
        delete updatedUser.password_hash;

        return updatedUser;
    },

    async deleteUser(userId) {
        return await UserModel.delete(userId);
    },

    async getUserById(userId) {
        const user = await UserModel.findById(userId);
        if (!user) throw new Error("We couldn't locate the user you're looking for. Please double-check and try again.");
        delete user.password_hash;
        return user;
    },

    async loginUser(email, password) {
        const user = await UserModel.findByEmail(email);
        if (!user || !await bcrypt.compare(password, user.password_hash)) {
            throw new Error("Invalid email or password.");
        }
        await UserModel.updateLastLogin(user.id);
        return jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: JWT_EXPIRATION });
    },

    async registerUser(username, email, password, fullName, phoneNumber = null) {
        if (!username || !email || !password || !fullName) {
            throw new Error("Please fill in all required fields: username, email, password, and full name.");
        }
    
        try {
            const existingUserByUsername = await UserModel.findByUsername(username);
            if (existingUserByUsername) {
                throw new Error("Username already in use");
            }
    
            const existingUserByEmail = await UserModel.findByEmail(email);
            if (existingUserByEmail) {
                throw new Error("Email already in use");
            }
    
            const hashedPassword = await bcrypt.hash(password, 10);
    
            return UserModel.create({
                username: username,
                email: email,
                full_name: fullName,
                password_hash: hashedPassword
            });
        } catch (error) {
            if (error.message.includes("Username already in use")) {
                throw new Error("The provided username is already taken. Please choose another one.");
            }
            if (error.message.includes("Email already in use")) {
                throw new Error("The provided email is already registered. Please log in or use another email.");
            }
            throw new Error("An error occurred while processing your request. Please try again later.");
        }
    },
    
    

    async requestPasswordReset(email) {
        const user = await UserModel.findByEmail(email);
        if (!user) {
            throw new Error("We couldn't locate an account with the provided email. Please double-check and try again.");
        }
        return jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: JWT_EXPIRATION });
    },

    async getUserRolesAndPermissions(userId) {
        try {
            const roles = await UserModel.getUserRoles(userId);
            const permissions = await UserModel.getPermissions(userId);
            return {
                roles: roles,
                permissions: permissions
            };
        } catch (error) {
            logger.error(`Error fetching roles and permissions for user with ID ${userId}: ${error.message}`);
            throw new Error('Unable to fetch roles and permissions.');
        }
    }
};

module.exports = UserService;
