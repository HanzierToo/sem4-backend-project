const express = require('express');
const mysql = require('mysql');
const router = express.Router();
const dbConfig = require('./dbConfig');

const pool = mysql.createPool(dbConfig);

router.get('/', (req, res) => {
    const gameId = parseInt(req.query.id)

    const query = 'SELECT * FROM games WHERE game_id = ?';

    pool.query(query, [gameId], (error, results) => {
        if (error) throw error;

        if (results.length === 0) {
            return res.status(404).send('Game not found.');
        }

        const game = results[0];
        res.render('editGame', { game });
    });
});

router.post('/', (req, res) => {
    const { title, developer, publisher, price, description, game_id } = req.body;

    if (!title || !developer || !publisher || !price || !description || !game_id) {
        return res.status(400).send('All fields are required.');
    }

    const query = 'UPDATE games SET title = ?, developer = ?, publisher = ?, price = ?, description = ? WHERE game_id = ?';
    const values = [title, developer, publisher, price, description, game_id];

    pool.query(query, values, (error) => {
        if (error) throw error;

        res.redirect('/');
    });
});

module.exports = router;
