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
                partnerOneName: user.partnerOneName,
                partnerTwoName: user.partnerTwoName,
                username: user.username,
                email: user.email,
                phone:user.phone,
                wedding_date: user.wedding_date,
                role: user.role,
                coupleType: user.coupleType,
                wedding_date: user.wedding_date,
            },
        });
    } catch (error) {
        console.error("Error logging in user:", error);
        res.status(500).json({ error: "Failed to login user" });
    }
};

const registerUser = async (req, res) => {
    try {
        const { partnerOneName, partnerTwoName, username, email, phone, password, role, coupleType, weddingDate } = req.body;

        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.status(400).json({ error: "Email or username is already in use" });
        }

        const newUser = new User({
            partnerOneName,
            partnerTwoName,
            username,
            email,
            phone,
            password,
            role,
            coupleType,
            weddingDate,
        });

        await newUser.save();
        res.status(201).json({
            message: "User registered successfully!",
            user: {
                userID: newUser._id,
                partnerOneName: newUser.partnerOneName,
                partnerTwoName: newUser.partnerTwoName,
                username: newUser.username,
                role: newUser.role,
                coupleType: newUser.coupleType,
                weddingDate: newUser.weddingDate,
            },
        });
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ error: "Failed to register user" });
    }
};

const updateCompletedTasks = async (req, res) => {
    try {
        const { userId, taskId, completed } = req.body;

        const update = completed
            ? { $addToSet: { completedTasks: taskId } }
            : { $pull: { completedTasks: taskId } };

        const user = await User.findByIdAndUpdate(userId, update, { new: true });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json({ message: "Task status updated successfully", completedTasks: user.completedTasks });
    } catch (error) {
        console.error("Error updating completed tasks:", error);
        res.status(500).json({ error: "Failed to update completed tasks" });
    }
};

const getUserById = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId).select("-password");
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({ error: "Failed to fetch user" });
    }
};

module.exports = {
    registerUser,
    loginUser,
    updateCompletedTasks,
    getUserById,
};
