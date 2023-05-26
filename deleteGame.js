const express = require('express');
const mysql = require('mysql');
const router = express.Router();
const dbConfig = require('./dbConfig');
const pool = mysql.createPool(dbConfig);

router.post('/', (req, res) => {
    const gameId = req.body.gameId;

    if (!gameId) {
        return res.status(400).send('Game ID is required.');
    }

    const deleteQuery = 'DELETE FROM games WHERE game_id = ?';
    pool.query(deleteQuery, gameId, (error) => {
        if (error) throw error;

        res.redirect('/');
    });
});

module.exports = router;
