const express = require('express');
const mysql = require('mysql');
const router = express.Router();
const dbConfig = require('./dbConfig');
const pool = mysql.createPool(dbConfig);

router.get('/', (req, res) => {
    const id = req.query.id;
    const column = req.query.column;
    const value = req.query.value;

    const query = `UPDATE games SET ${column} = ? WHERE id = ?`;
    const values = [value, id];

    pool.query(query, values, (error, results) => {
        if (error) throw error;

        res.json({ message: 'Game updated successfully', id: id });
    });
});

module.exports = router;
