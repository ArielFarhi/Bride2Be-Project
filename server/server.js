require("dotenv").config();
const express = require("express");
const app = express();
const logger = require('morgan');
const cors = require("cors");
const port = process.env.PORT || 8080;

const { usersRouter } = require("./routers/usersRouter");
const { checklistRouter } = require("./routers/checkListsRouter");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger("dev"));

app.use(cors());

app.use((req, res, next) => {
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.set('Access-Control-Allow-Methods', "GET, POST, PUT, DELETE, OPTIONS");
    res.set('Content-Type', 'application/json');
    next();
});

app.use('/api/users', usersRouter);
app.use('/api/checklistTasks', checklistRouter);

app.use((req, res) => {
    res.status(400).send("Page wasn't found");
});

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});