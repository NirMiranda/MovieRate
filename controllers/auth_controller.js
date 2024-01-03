
const User = require("../models/user_model");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password) {
        return res.status(400).send("Missing email OR password");
    }

    try {
        const user = await User.findOne({ 'email': email });

        if (user == null) {
            return res.status(406).send("Email does not exist");
        }

        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            return res.status(401).send("Email or password incorrect");
        }

        const accessToken = await jwt.sign({ '_id': user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.JWT_EXPIRATION });
        const refreshToken = await jwt.sign({ '_id': user._id }, process.env.REFRESH_TOKEN_SECRET);

        if (user.tokens == null) user.tokens = [refreshToken];
        else user.tokens.push(refreshToken);

        await user.save();

        res.status(200).send({ 'accessToken': accessToken, 'refreshToken': refreshToken });
    } catch (error) {
        return res.status(400).send(`Error: ${error.message}`);
    }
};

const register = async (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const age = req.body.age;

    if (!email || !password || !age || !name) {
        return res.status(400).send("Missing email, password, age, or name");
    }

    try {
        const response = await User.findOne({ 'email': email });

        if (response != null) {
            return res.status(406).send("Email is already registered");
        }

        const salt = await bcrypt.genSalt(10);
        const encryptedPassword = await bcrypt.hash(password, salt);

        const response2 = await User.create({ 'name': name, 'email': email, 'password': encryptedPassword, 'age': age });
        return res.status(201).send(response2);

    } catch (error) {
        return res.status(400).send(`Error: ${error.message}`);
    }
};



const logout = async (req, res) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) {
        return res.sendStatus(401);
    }
    const userInfo=jwt.verify(token, process.env.REFRESH_TOKEN_SECRET)
        if (userInfo==null) {
            return res.status(403).send('Invalid request0');
        }
      
        const userId = userInfo._id; 
         console.log("the userID is:" ,userId);
        try {
            const user = await User.findById(userId);

            if (user == null) {
                return res.status(403).send('Invalid request1');
            }

            if (!user.tokens.includes(token)) {
                user.tokens = [];
                await user.save();
                return res.status(403).send('Invalid request2');
            }

            user.tokens.splice(user.tokens.indexOf(token), 1);
            await user.save();
            res.status(200).send('Logout successful RefreshToken in delete');
        } catch (err) {
            res.status(403).send('Invalid request3');
        }
   
};


const refreshToken = async (req, res, next) => {
    authHeaders = req.headers['authorization'];
    const token = authHeaders && authHeaders.split(' ')[1];
    if (token == null) return res.sendStatus('401');

    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, async (err, userInfo) => {
        if (err) return res.status(403).send(err.message);

        const userId = req._id;

        try {
            user = await User.findById(userId);
            if (user == null) return res.status(403).send('Invalid request');
            if (!user.tokens.includes(token)) {
                user.tokens = [];
                await user.save();
                return res.status(403).send('Invalid request');
            }

            const accessToken = await jwt.sign({ '_id': user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.JWT_EXPIRATION });
            const refreshToken = await jwt.sign({ '_id': user._id }, process.env.REFRESH_TOKEN_SECRET);

            user.tokens[user.tokens.indexOf(token)] = refreshToken;
            await user.save();
            res.status(200).send({ 'accessToken': accessToken, 'refreshToken': refreshToken });

        } catch (err) {
            res.status(403).send(err.message);
        }
    });
};

module.exports = { logout, register, login, refreshToken };
