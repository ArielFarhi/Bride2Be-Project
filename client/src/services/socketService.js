import { io } from "socket.io-client";

const socket = io("http://localhost:8080", {
    autoConnect: false,
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 2000,
});

export default socket;