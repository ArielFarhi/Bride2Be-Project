import React, { useState, useEffect } from "react";
import io from "socket.io-client";


const socket = io("http://localhost:8080");

const Chat = ({ user }) => {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await fetch("http://localhost:8080/api/messages");
                const data = await response.json();
                console.log("Fetched messages:", data);
                setMessages(data); // Populate messages state
            } catch (err) {
                console.error("Error fetching messages:", err);
            }
        };

        fetchMessages();

        socket.on("receive_message", (newMessage) => {
            setMessages((prevMessages) => [...prevMessages, newMessage]); 
        });

        return () => {
            socket.off("load_messages");
            socket.off("receive_message");
            socket.disconnect();
        };
    }, []);

    const sendMessage = () => {
        if (message.trim() !== "") {
            const chatMessage = { user: user.username, text: message };
            socket.emit("send_message", chatMessage);
            setMessage("");
        }
    };

    return (
        <div className="chat-container">
            <div className="chat-messages">
                {messages.map((msg, index) => (
                    <div key={index} className="chat-message">
                        <strong>{msg.user || msg.userName}: </strong>
                        {msg.text || msg.content}
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
