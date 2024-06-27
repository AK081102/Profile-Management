// controller/userSignUp.js

const userModel = require("../model/usermodel");
const bcryptjs = require('bcryptjs');

async function userSignup(req, res) {
    try {
        const { email, name, password, profilePic } = req.body;

        if (!email) {
            return res.status(400).json({
                message: "Please Enter Your Email",
                error: true,
                success: false
            });
        }
        if (!name) {
            return res.status(400).json({
                message: "Please Enter Your Name",
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
        if (user) {
            return res.status(400).json({
                message: "User Already Exists",
                error: true,
                success: false
            });
        }

        bcryptjs.genSalt(10, function (err, salt) {
            if (err) {
                return res.status(500).json({
                    message: "Salt generation failed",
                    error: true,
                    success: false
                });
            }
            bcryptjs.hash(password, salt, async function (err, hash) {
                if (err) {
                    return res.status(500).json({
                        message: "Hashing failed",
                        error: true,
                        success: false
                    });
                }
                console.log("hash", hash);

                const payload = {
                    email,
                    name,
                    password: hash,
                    profilePic // Include profile picture
                };
                const userDetails = new userModel(payload);
                const save = await userDetails.save();

                return res.status(200).json({
                    message: "User Registered Successfully",
                    data: save,
                    error: false,
                    success: true
                });
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

module.exports = userSignup;
