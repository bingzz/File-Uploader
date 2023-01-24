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
    let query, insertQuery, queryData;
    query = `SELECT * FROM files`;

    try {
        db.query(query, (error, results) => {
            if (error) {
                res.send('error')
            } else {
                queryData = {
                    IMEI_ID: req.body['imei'],
                    FILE_UPLOADED: req.body['date'],
                    PAO_ID: req.body['pao'],
                    BUS_ID: req.body['busNum'],
                    FILE: req.body['file'],
                };

                db.query(`INSERT INTO files SET ?`, queryData, (error, results) => {
                    if (error) {
                        res.send('error add')
                    } else {
                        console.log(results);
                        res.send(true);
                    }
                });
            }
        });
    } catch (err) {
        console.log(err);
    }
};

// END POINTS
router.post("/uploadFile", (req, res) => {
    uploadFile(req, res);
});

router.get("/testDisplay", (req, res) => {
    db.query(`SELECT * FROM files`, (error, results) => {
        res.send({
            asdfasfsdf: 'test'
        })
    });
    
});

module.exports = router;
