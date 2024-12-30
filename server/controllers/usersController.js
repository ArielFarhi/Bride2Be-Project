const User = require("../models/User");

const registerUser = async (req, res) => {
    try {
        console.log(req.body);
        const { fullName, username, email, password, role, coupleType, wedding_date } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.status(400).json({ error: "Email or username is already in use" });
        }

        // Create new user
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
};
