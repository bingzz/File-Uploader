const express = require("express");
const cors = require("cors");
const path = require("path");
const mysql = require("mysql");
const dotenv = require("dotenv");
// const morgan = require("morgan");
const bodyParser = require("body-parser");

// MULTIPLE API CONTROLLER DIRECTORIES
const serverControllers = ["./public/uploadFileController"];

const app = express(),
    db = mysql.createConnection({
        host: process.env.DBHOST,
        user: process.env.DBUSER,
        password: process.env.DBPASSWORD,
        database: process.env.DATABASE,
    });

dotenv.config({
    path: "./envdat.env",
});

app.use(express.json({ limit: '2gb'}))
    .use(bodyParser.json({ limit: '2gb'}))
    .use(bodyParser.urlencoded({ extended: true, limit: '2gb' }))
    .use(bodyParser.json({ type: "application/vnd.api+json" }))
    // .use(morgan("combined"))
    .use(
        cors({
            origin: ["http://127.0.0.1:5500"],
            methods: ["GET", "POST", "PUT", "DELETE"],
            credentials: true,
        })
    )
    .use(express.static(path.join(__dirname, "./public")));

serverControllers.map((item) => {
    app.use("/api", require(item));
});

db.connect((error) => {
    try {
        console.log("Connection Success");
    } catch {
        console.log(error);
    }
});

app.listen(process.env.PORT, () => {
    console.log(`App Port: [${process.env.PORT}]`);
});
