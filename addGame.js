const express = require('express');
const mysql = require('mysql');
const router = express.Router();
const dbConfig = require('./dbConfig');

const pool = mysql.createPool(dbConfig);

router.get('/', (req, res) => {
    const loggedIn = req.session.loggedIn;

    if (!loggedIn) {
        res.redirect('/login');
        return;
    }

    res.render('addGame');
});

router.post('/', (req, res) => {
    const loggedIn = req.session.loggedIn;

    if (!loggedIn) {
        res.redirect('/login');
        return;
    }

    const { title, developer, publisher, price, description } = req.body;

    if (!title || !developer || !publisher || !price || !description) {
        return res.status(400).send('All fields are required.');
    }

    pool.query('SELECT * FROM games WHERE title = ?', [title], (error, results) => {
        if (error) throw error;

        if (results.length > 0) {
            return res.status(400).send('Game already exists in the database.');
        }

        const userId = req.session.userId;
        const game = { title, developer, publisher, price, description, user_id: userId };
        pool.query('INSERT INTO games SET ?', game, (error) => {
            if (error) throw error;

            res.redirect('/');
        });
    });
});

module.exports = router;
