const jwt = require("jsonwebtoken");

const User = require("../model/user.model");

const getUserInfo = async (req, res, next) => {
    const token = req.headers["x-access-token"];
    const email = jwt.decode(token).email;

    try {
        const user = await User.findOne({ email });

        const data = {
            _id: user._id.toString(),
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName
        }

        return res.status(200).json(data);
        // return res.send('welcome')
    } catch (err) {
        console.error(err);
    }

}

module.exports = { getUserInfo }