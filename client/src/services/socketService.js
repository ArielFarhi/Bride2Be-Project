import { io } from "socket.io-client";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const socket = io(API_BASE_URL, {
    autoConnect: false,
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 2000,
});

export default socket;