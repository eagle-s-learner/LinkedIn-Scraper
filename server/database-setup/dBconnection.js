const mysql = require("mysql2/promise");

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: process.env.PASSWORD_WORKBENCH,
    database: "linkedincrawl",
    waitForConnections: true,
    connectionLimit: 100,
    queueLimit: 0,
});

// console.log("pool", pool !== null);

module.exports = pool;
