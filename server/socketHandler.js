const Message = require("./models/Message");

const socketHandler = (io) => {
    io.on("connection", (socket) => {
        console.log("A user connected:", socket.id);
        
        socket.on("send_message", (msg) => {
            const newMessage = new Message({
                content: msg.text,
                username: msg.username,
            });

            newMessage
                .save()
                .then((savedMessage) => {
                    io.emit("receive_message", {
                        id: savedMessage._id,
                        text: savedMessage.content,
                        username: savedMessage.username,
                        timestamp: savedMessage.timestamp,
                    });
                })
                .catch((err) => console.error("Error saving message:", err));
        });

        socket.on("disconnect", () => {
            console.log("A user disconnected:", socket.id);
        });
    });
};

module.exports = socketHandler;
