const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new Schema(
    {
        fullName: { type: String, required: false },
        username: { type: String, required: false, unique: true },
        email: { type: String, required: false, unique: true },
        password: { type: String, required: false },
        role: {
            type: String,
            enum: ["Bride", "Groom", "Other"],
            default: "Bride",
        },
        coupleType: {
            type: String,
            enum: ["BrideAndGroom", "BrideAndBride", "GroomAndGroom"],
            default: "BrideAndGroom",
        },
        wedding_date: { type: Date, required: false },
    },
    { collection: "users" }
);

// Pre-save middleware to hash passwords
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

module.exports = model("User", userSchema);
