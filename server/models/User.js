const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
        type: String,
        enum: ["Bride", "Groom", "Other"],
        default: "Bride"
    },
    wedding_date: { type: Date, required: true },
    // tasks: [TaskSchema],
    notifications: [
        {
            message: { type: String, required: true },
            date: { type: Date, default: Date.now }
        }
    ]
}, { collection: 'users' });

const User = model('User', userSchema);

module.exports = User;