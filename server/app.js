require("dotenv").config();
require("./config/database").connect();

const authService = require("./service/auth.service");
const profileService = require("./service/profile.service");

const authMiddleware = require("./middleware/auth.middleware");

const express = require("express");
const app = express();

const cors = require('cors');
app.use(express.json());
app.use(cors({
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}));

app.post("/register", authService.registerUser);
app.post("/login", authService.loginUser);
app.get("/home", authMiddleware.verifyToken, profileService.getUserInfo);

module.exports = app;