const mysql = require("mysql"),
    express = require("express"),
    router = express.Router(),
    db = mysql.createConnection({
        host: process.env.DBHOST,
        user: process.env.DBUSER,
        password: process.env.DBPASSWORD,
        database: process.env.DATABASE,
    });

// serverControllers/uploadFile
const uploadFile = (req, res) => {
    console.log(req.body);
    res.send(true);
};

// END POINTS
router.post("/api/uploadFile", (req, res) => {
    uploadFile(req, res);
});

module.exports = router;
