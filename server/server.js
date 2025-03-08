require("dotenv").config();
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const logger = require("morgan");
const cors = require("cors");
const socketHandler = require("./socketHandler");
const path = require("path");

const PORT = process.env.PORT || 8080;

const { usersRouter } = require("./routers/usersRouter");
const { messagesRouter } = require("./routers/messagesRouter");
const { checklistRouter } = require("./routers/checkListsRouter");
const vendorsRouter = require("./routers/vendorsRouter");

const app = express();
const server = http.createServer(app);

const allowedOrigins = [
    "http://localhost:3000",
    "https://bride2be-project.onrender.com"
];


const io = new Server(server, {
    cors: {
        origin: allowedOrigins,
        methods: ["GET", "POST"],
    },
});

socketHandler(io);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger("dev"));

app.use(cors({
    origin: "*",
}));

app.use((req, res, next) => {
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.set("Content-Type", "application/json");
    next();
});

app.use(express.static(path.join(__dirname, "public"), {
    setHeaders: (res, path) => {
        if (path.endsWith(".html")) {
            res.setHeader("Content-Type", "text/html; charset=UTF-8");
        } else if (path.endsWith(".css")) {
            res.setHeader("Content-Type", "text/css");
        } else if (path.endsWith(".js")) {
            res.setHeader("Content-Type", "application/javascript");
        }
    }
}));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.use("/api/users", usersRouter);
app.use('/api/messages', messagesRouter);
app.use('/api/checklist', checklistRouter);
app.use("/api/vendors", vendorsRouter);

app.use((req, res) => {
    res.status(400).send("Page wasn't found");
});

server.listen(PORT, () => {
    console.log(`Express Server listening on port ${PORT}`);
});