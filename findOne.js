const express = require('express');
const mysql = require('mysql');
const router = express.Router();
const dbConfig = require('./dbConfig');
const pool = mysql.createPool(dbConfig);

router.get('/', (req, res) => {
    const column = req.query.column;
    const value = req.query.value;

    const query = `SELECT * FROM games WHERE ${column} LIKE ?`;
    const values = [`%${value}%`];

    pool.query(query, values, (error, results) => {
        if (error) throw error;

        res.json(results[0]);
    });
});

module.exports = router;
