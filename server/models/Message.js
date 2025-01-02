const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    content: { type: String, required: true },
    userName: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Message", messageSchema, "messages");
