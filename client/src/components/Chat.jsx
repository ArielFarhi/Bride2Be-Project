import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:8080");

const Chat = ({ user }) => {
    console.log(user);
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        socket.on("receive_message", (data) => {
            setMessages((prevMessages) => [...prevMessages, data]);
        });

        return () => {
            clearInterval();
            socket.disconnect();
        };
    }, []);

    const sendMessage = () => {
        if (message.trim() !== "") {
            const chatMessage = { user: user.username, text: message }; // Add user info if needed
            socket.emit("send_message", chatMessage);
            setMessages((prevMessages) => [...prevMessages, chatMessage]);
            setMessage("");
        }
    };

    return (
        <div className="chat-container">
            <div className="chat-messages">
                {messages.map((msg, index) => (
                    <div key={index} className="chat-message">
                        <strong>{msg.user}: </strong>
                        {msg.text}
                    </div>
                ))}
            </div>
            <div className="chat-input">
                <input
                    type="text"
                    placeholder="Type a message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    );
};

export default Chat;
