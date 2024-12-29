const User = require("../models/User");

async function getUsers(req, res) {
    const users = await User.find({});
    res.json(users);
}

async function registerUser(req, res) {
    const { name, email, password, role, wedding_date } = req.body;

    try {
        const newUser = new User({ name, email, password, role, wedding_date });
        await newUser.save();
        res.status(201).json({ message: "User registered successfully!" });
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ error: "Failed to register user" });
    }
}

exports.usersController = { getUsers, registerUser };
