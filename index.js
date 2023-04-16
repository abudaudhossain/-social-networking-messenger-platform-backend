const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const port = process.env.PORT || 3000;

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

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});
