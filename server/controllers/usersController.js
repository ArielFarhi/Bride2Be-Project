// const bcrypt = require("bcrypt");
// const User = require("../models/User");

// const loginUser = async (req, res) => {
//     try {
//         const { username, password } = req.body;

//         const user = await User.findOne({ username });
//         if (!user) {
//             return res.status(404).json({ error: "User not found" });
//         }

//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) {
//             return res.status(401).json({ error: "Invalid username or password" });
//         }

//         res.status(200).json({
//             message: "Login successful",
//             user: {
//                 userID: user._id,
//                 username: user.username,
//                 role: user.role,
//                 coupleType: user.coupleType,
//             },
//         });
//     } catch (error) {
//         console.error("Error logging in user:", error);
//         res.status(500).json({ error: "Failed to login user" });
//     }
// };

// const registerUser = async (req, res) => {
//     try {
//         console.log(req.body);
//         const { fullName, username, email, password, role, coupleType, wedding_date } = req.body;

//         const existingUser = await User.findOne({ $or: [{ email }, { username }] });
//         if (existingUser) {
//             return res.status(400).json({ error: "Email or username is already in use" });
//         }

//         const newUser = new User({
//             fullName,
//             username,
//             email,
//             password,
//             role,
//             coupleType,
//             wedding_date,
//         });

//         await newUser.save();
//         res.status(201).json({ message: "User registered successfully!" });
//     } catch (error) {
//         console.error("Error registering user:", error);
//         res.status(500).json({ error: "Failed to register user" });
//     }
// };

// module.exports = {
//     registerUser,
//     loginUser,
// };


const bcrypt = require("bcrypt");
const User = require("../models/User");

const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // בדיקת סיסמה
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: "Invalid username or password" });
        }

        // החזרת תגובת הצלחה עם כל המידע הנדרש
        res.status(200).json({
            message: "Login successful",
            user: {
                userID: user._id,
                username: user.username,
                role: user.role,
                coupleType: user.coupleType,
                wedding_date: user.wedding_date, // הוספת תאריך החתונה
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

        // בדיקה אם המשתמש כבר קיים
        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.status(400).json({ error: "Email or username is already in use" });
        }

        // יצירת משתמש חדש
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
        res.status(201).json({ 
            message: "User registered successfully!",
            user: { 
                userID: newUser._id,
                username: newUser.username,
                role: newUser.role,
                coupleType: newUser.coupleType,
                wedding_date: newUser.wedding_date,
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
