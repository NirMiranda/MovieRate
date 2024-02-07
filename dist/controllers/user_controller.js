"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = __importDefault(require("../models/user_model"));
const validation_1 = __importDefault(require("../models/validation"));
const movie_model_1 = __importDefault(require("../models/movie_model"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
/*crud*/
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("getAllUsers");
    try {
        let users;
        if (req.query.name) {
            users = yield user_model_1.default.find({ name: req.query.name });
        }
        else {
            users = yield user_model_1.default.find();
        }
        res.send(users);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("get user by id: ", req.params.id);
        const user = yield user_model_1.default.findById(req.params.id);
        res.send(user);
    }
    catch (error) {
        console.error('Error retrieving user by ID:', error.message);
        res.status(500).json({ message: error.message });
        return null;
    }
});
const getMoviesByUserId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.id; // Assuming the user ID is passed as a parameter in the request
        const user = yield user_model_1.default.findById(userId);
        if (!user) {
            return res.status(404).send("User not found");
        }
        const moviesUploaded = yield movie_model_1.default.find({ uploadedBy: userId });
        res.status(200).send(moviesUploaded);
    }
    catch (error) {
        console.error("Error retrieving movies by user ID:", error.message);
        res.status(500).json({ message: error.message });
    }
});
const postUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password, age } = req.body;
        yield validation_1.default.validateAsync({ name, email, password, age }); // Use the validateAsync function from the imported authSchema
        const user = new user_model_1.default(req.body);
        try {
            yield user.save();
            res.status(200).json(user);
        }
        catch (error) {
            console.log('error1');
            console.log(error);
            res.send("failed: " + error.message);
        }
    }
    catch (error) {
        if (error.isJoi === true) {
            console.log('error');
            const errorMessage = error.details[0].message; // Extract the error message from the validation error
            res.status(400).json({ error: errorMessage }); // Return the error message as JSON
        }
    }
});
const extractErrorMessages = (error) => {
    if (error.isJoi === true) {
        return error.details.map((detail) => detail.message).join(', ');
    }
    return error.message;
};
const updateUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.id;
        console.log('Update request received for user ID:', userId);
        const { name, email, password, age } = req.body;
        const user = yield user_model_1.default.findById(userId);
        if (!user) {
            return res.status(404).send('User not found');
        }
        // Validate name, email, password, and age using authSchema
        const validationObject = { name, email, password, age };
        try {
            yield validation_1.default.validateAsync(validationObject, { abortEarly: false });
        }
        catch (validationError) {
            const errorMessage = extractErrorMessages(validationError);
            return res.status(400).json({ error: errorMessage });
        }
        // Update user fields
        user.name = name;
        user.email = email;
        user.age = age;
        // Check if the password is being updated
        // Hash the new password
        console.log("Updating password");
        const salt = yield bcryptjs_1.default.genSalt(10);
        const encryptedPassword = yield bcryptjs_1.default.hash(password, salt);
        user.password = encryptedPassword;
        // Save the changes to the database
        yield user.save();
        res.send('User updated successfully');
    }
    catch (error) {
        const errorMessage = extractErrorMessages(error);
        return res.status(500).json({ error: errorMessage });
    }
});
const deleteUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        // Retrieve user details before deletion
        const user = yield user_model_1.default.findById(id);
        if (!user) {
            return res.status(404).send("User not found");
        }
        // Delete the user
        yield user_model_1.default.findByIdAndDelete(id);
        // Respond with the deleted user details
        res.send("User deleted successfully");
        console.log("User deleted:", user);
    }
    catch (error) {
        console.log("Can't delete user:", error.message);
        res.status(500).send("Failed to delete user");
    }
});
const getUserByToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authHeader = req.headers['authorization'];
        const refreshToken = authHeader && authHeader.split(' ')[1];
        if (!refreshToken) {
            return res.status(401).send("Unauthorized: Missing refreshToken");
        }
        const decoded = jsonwebtoken_1.default.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        console.log("Decoded token payload:", decoded);
        if (!decoded) {
            return res.status(401).send("Unauthorized: Invalid refreshToken");
        }
        const userId = decoded._id;
        console.log(userId);
        const user = yield user_model_1.default.findById(userId).populate({
            path: 'reviews',
            model: 'Review',
            populate: {
                path: 'reviewerId',
                model: 'Users',
            },
        }).exec();
        if (!user) {
            return res.status(404).send("User not found");
        }
        res.status(200).json({ user });
    }
    catch (error) {
        console.error("Error retrieving user by refreshToken:", error.message);
        res.status(500).send("Failed to retrieve user");
    }
});
exports.default = {
    getAllUsers,
    postUser,
    getUserById,
    updateUserById,
    deleteUserById,
    getUserByToken,
    getMoviesByUserId
};
//# sourceMappingURL=user_controller.js.map