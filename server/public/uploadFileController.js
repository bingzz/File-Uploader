const mysql = require("mysql");
const express = require("express");
const { spawn } = require("child_process");
const fs = require("fs");
const router = express.Router();

const db = mysql.createConnection({
    host: process.env.DBHOST,
    user: process.env.DBUSER,
    password: process.env.DBPASSWORD,
    database: process.env.DATABASE,
});

// serverControllers/uploadFile
const uploadFile = (req, res) => {
    console.log(req.body);

    let query, insertQuery, queryData;
    query = `SELECT * FROM files`;

    db.query(query, (error, results) => {
        console.log(results);
        queryData = {
            IMEI_ID: req.body.imei,
            PAO_ID: req.body.pao,
            BUS_ID: req.body.busNum,
            FILE: req.body.file,
        };

        db.query(`INSERT INTO files SET ?`, queryData, (error, results) => {
            if (error) {
                console.log(error);
            } else {
                console.log(results);
                res.send(true);
            }
        });
    });

    
};

// END POINTS
router.post("/uploadFile", (req, res) => {
    uploadFile(req, res);
});

router.post("/testDisplay", (req, res) => {
    console.log("test");
    db.query(`SELECT * FROM files`, (error, results) => {
        console.log(results);
        // console.log(error);
        // console.log(db);
    });
});

module.exports = router;
