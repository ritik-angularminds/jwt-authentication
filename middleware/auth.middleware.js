const jwt = require("jsonwebtoken");
const env = process.env;

const verifyToken = async (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers["x-access-token"];
    if (!token) {
        return res.status(403).json({
            error: "Token is required for authentication"
        });
    }

    try {
        const decoded = jwt.verify(token, env.TOKEN_KEY);
    } catch(err) {
        console.error(err);
    }
    next();
};

module.exports = { verifyToken };