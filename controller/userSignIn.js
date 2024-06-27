// controller/userSignIn.js

const userModel = require("../model/usermodel");
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');

async function userSignin(req, res) {
    try {
        const { email, password } = req.body;

        if (!email) {
            return res.status(400).json({
                message: "Please Enter Your Email",
                error: true,
                success: false
            });
        }
        if (!password) {
            return res.status(400).json({
                message: "Please Enter Your Password",
                error: true,
                success: false
            });
        }

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "User Not Found",
                error: true,
                success: false
            });
        }

        bcryptjs.compare(password, user.password, function (err, resBcrypt) {
            if (err || !resBcrypt) {
                return res.status(400).json({
                    message: "Please Check Your Password",
                    error: true,
                    success: false
                });
            }

            const payload = {
                email: user.email,
                name: user.name, // Include the name in the token payload
                profilePic: user.profilePic,
                _id: user._id
            };
            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: '1h'
            });

            return res.status(200).json({
                token: token,
                error: false,
                success: true,
                message: "User Logged In Successfully"
            });
        });
    } catch (err) {
        return res.status(500).json({
            message: "Something Went Wrong",
            error: true,
            success: false
        });
    }
}

module.exports = userSignin;
