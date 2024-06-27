const UserProfile = require('../model/UserProfile');

// Save user profile
const saveUserProfile = async (req, res) => {
    const userId = req.user._id; // Assuming user ID is available in req.user after token verification

    try {
        const existingProfile = await UserProfile.findOne({ user: userId });

        if (existingProfile) {
            return res.status(400).json({ error: 'Profile data already saved' });
        }

        const profileData = new UserProfile({
            ...req.body,
            user: userId
        });

        await profileData.save();
        res.status(201).json({ message: 'Profile data saved successfully' });
    } catch (error) {
        console.error('Error saving profile:', error);
        res.status(500).json({ error: 'An unexpected error occurred' });
    }
};

// Get user profile
const getUserProfile = async (req, res) => {
    const userId = req.user._id;

    try {
        const userProfile = await UserProfile.findOne({ user: userId });

        if (!userProfile) {
            return res.status(404).json({ error: 'User profile not found' });
        }

        res.status(200).json({ data: userProfile });
    } catch (error) {
        // console.error('Error fetching profile:', error);
        // res.status(500).json({ error: 'An unexpected error occurred' });
    }
};

module.exports = {
    saveUserProfile,
    getUserProfile
};
