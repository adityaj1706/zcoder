const signupDetails = require('../model/signup');
const userStatsDetails = require('../model/userstats');

const signup = async (req, res) => {
    try {
        const { username, name, email, password } = req.body;
        const existingUser = await signupDetails.findOne({ username: username });
        if (existingUser) {
            return res.status(409).json({ message: 'Username already exists' });
        } else {
            const newUser = new signupDetails({
                username: username,
                name: name,
                email: email,
                password: password
            });
            await newUser.save();
            const newUserStats = new userStatsDetails({
                username: username,
                bookmarks: [],
                solved: []
            });
            await newUserStats.save();
            return res.status(201).json({ message: 'Signup successful' });
        }
    } catch (error) {
        return res.status(500).json({ message: error });
    }
}

module.exports = signup;   