const Message = require("./models/Message");

let connectedUsers = 0;

const socketHandler = (io) => {
    io.on("connection", (socket) => {
        connectedUsers++;
        io.emit("update_user_count", connectedUsers); 

        console.log("A user connected:", socket.id);
        console.log("Connected users:", connectedUsers);
        
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

        socket.on("request_user_count", () => {
            socket.emit("update_user_count", connectedUsers);
        })

        socket.on("disconnect", (reason) => {
            connectedUsers--;
            io.emit("update_user_count", connectedUsers); 
            console.log("A user disconnected:", socket.id);
            console.log("Connected users:", connectedUsers);
        });
    });
};

module.exports = socketHandler;
