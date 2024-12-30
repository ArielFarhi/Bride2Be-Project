const bcrypt = require("bcrypt");
const User = require("../models/User");

const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: "Invalid username or password" });
        }

        res.status(200).json({
            message: "Login successful",
            user: {
                userID: user._id,
                username: user.username,
                role: user.role,
                coupleType: user.coupleType,
            },
        });
    } catch (error) {
        console.error("Error logging in user:", error);
        res.status(500).json({ error: "Failed to login user" });
    }
};

const registerUser = async (req, res) => {
    try {
        console.log(req.body);
        const { fullName, username, email, password, role, coupleType, wedding_date } = req.body;

        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.status(400).json({ error: "Email or username is already in use" });
        }

        const newUser = new User({
            fullName,
            username,
            email,
            password,
            role,
            coupleType,
            wedding_date,
        });

        await newUser.save();
        res.status(201).json({ message: "User registered successfully!" });
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ error: "Failed to register user" });
    }
};

module.exports = {
    registerUser,
    loginUser,
};
