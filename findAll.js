const express = require('express');
const mysql = require('mysql');
const router = express.Router();
const dbConfig = require('./dbConfig');
const pool = mysql.createPool(dbConfig);

router.get('/', (req, res) => {
    const query = 'SELECT * FROM games';

    pool.query(query, (error, results) => {
        if (error) throw error;

        res.json(results);
    });
});

module.exports = router;
