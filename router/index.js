// routes/index.js

const express = require('express');
const router = express.Router();

const userSignup = require('../controller/userSignUp');
const userSignin = require('../controller/userSignIn');
const { saveUserProfile, getUserProfile } = require('../controller/userProfile');
const verifyToken = require('../middlewares/verifyToken');

router.post("/sign-up", userSignup);
router.post("/sign-in", userSignin);
router.post("/user-profile", verifyToken, saveUserProfile);
router.get("/user-profile", verifyToken, getUserProfile);

module.exports = router;
