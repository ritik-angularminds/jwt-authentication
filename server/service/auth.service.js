const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../model/user.model");

const registerUser = async (req, res) => {
    try {
        // get user input
        const { firstName, lastName, email, password } = req.body;
        if (!(email && password && firstName && lastName)) {
            return res.status(400).send("All input is required");
        }

        const oldUser = await User.findOne({ email });
        if (oldUser) {
            return res.status(409).send("User Already Exist. Please Login");
        }

        // encrypt password
        const encryptedPassword = await bcrypt.hash(password, 10);

        // create new User
        const user = await User.create({
            firstName,
            lastName,
            email: email.toLowerCase(), // sanitize: convert email to lowercase
            password: encryptedPassword,
        });

        // create token
        const token = jwt.sign({
            user_id: user._id, email
        }, process.env.TOKEN_KEY,
            {
                expiresIn: "2h"
            });

        // save token
        user.token = token;

        return res.status(201).json({
            token : user.token,
            email : user.email
        });
    } catch (err) {
        console.error(err);
    }
};

const loginUser = async (req, res, next) => {
    try {
        // get user input
        const { email, password } = req.body;

        if (!(email && password)) {
            return res.status(400).send("All inputs are required!");
        }

        const user = await User.findOne({ email });

        if(user && (await bcrypt.compare(password, user.password))) {
            const token = jwt.sign({
                user_id: user._id,
                email
            },
            process.env.TOKEN_KEY, {
                expiresIn: "24h"
            });

            // save token
            user.token = token;

            return res.status(200).json({ "token" : user.token });
        }
        return res.status(401).json("Invalid Credentials!");
    } catch(err) {
        console.error(err);
    }
};

module.exports = { loginUser, registerUser};