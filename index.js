const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

//for socket
const http = require("http");
const expressServer = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(expressServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});

const port = process.env.PORT || 5000;

//global middleware initialization
app.use(require('./app/middleware/middleware').global.socketIo(io));

app.use(cors());
app.use((req, res, next) => {
    req.rootDir = __dirname;
    next();
});
app.use(
    express.json({
        limit: "500mb",
    })
);
app.use(
    express.urlencoded({
        extended: true,
        limit: "5mb",
    })
);

//database connection with mongoose
const dbURL = `mongodb://127.0.0.1:27017/${process.env.DB_NAME}`;
// const dbURL = `mongodb://localhost:27017/${process.env.DB_NAME}`;

mongoose.connect(dbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", (error) => console.log(error));
db.once("open", () => console.log("Mong DB connect success"));

app.use("/api/v1", require("./routes/api"));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

//socket io
let i = 0;
io.on("connection", (socket) => {
    i = i + 1;
    console.log("a user connected", i);

    // socket.on("message", (msg) => {
    //     io.emit(`message`, msg);

    //     io.emit(`${msg.chatId}`, msg);
    //     io.emit(`unreadMessage_sender${msg.senderId}_res${msg.receiverId}`, msg);

    //     console.log(msg);
    // });

    socket.on("disconnect", () => {
        console.log("user disconnected");
    });
});

expressServer.listen(5000, () => {
    console.log("listening on *:5000");
});
