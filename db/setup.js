require("dotenv").config()
const fs = require("fs");

// Get a link to the database
const db = require("./connect");

const sql = fs.readFileSync("./server/db/setup.sql").toString();

// Run the query
db.query(sql)
    .then((data) => {
        db.end();
        console.log("Setup complete");
    })
    .catch((error) => console.log(error));