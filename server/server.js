const express = require("express");
(cors = require("cors")),
    (path = require("path")),
    (mysql = require("mysql")),
    (dotenv = require("dotenv")),
    (morgan = require("morgan")),
    (bodyParser = require("body-parser"));

// MULTIPLE API CONTROLLER DIRECTORIES
const serverControllers = "uploadFileController";

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

app.use(express.json())
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: true }))
    .use(morgan("combined"))
    .use(
        cors({
            origin: ["http://127.0.0.1:5500"],
            methods: ["GET", "POST", "PUT", "DELETE"],
            credentials: true,
        })
    )
    .use(express.static(path.join(__dirname, "./public")))
    .set("/api/", serverControllers);

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
