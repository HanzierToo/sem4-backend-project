const express = require('express');
const mysql = require('mysql');
const router = express.Router();
const dbConfig = require('./dbConfig');
const pool = mysql.createPool(dbConfig);

router.get('/', (req, res) => {
    const userId = req.query.userId;
    const title = req.query.title;
    const developer = req.query.developer;
    const publisher = req.query.publisher;
    const price = parseFloat(req.query.price);
    const description = req.query.description;

    const query = 'INSERT INTO games (user_id, title, developer, publisher, price, description) VALUES (?, ?, ?, ?, ?, ?)';
    const values = [userId, title, developer, publisher, price, description];

    pool.query(query, values, (error, results) => {
        if (error) throw error;

        res.json({ message: 'Game entry created successfully' });
    });
});

module.exports = router;
