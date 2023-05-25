const express = require('express');
const mysql = require('mysql');
const router = express.Router();
const dbConfig = require('./dbConfig'); // Import the dbConfig from the file

// Create a MySQL pool to handle database connections
const pool = mysql.createPool(dbConfig);

// Render the add game form
router.get('/', (req, res) => {
    const loggedIn = req.session.loggedIn;

    if (!loggedIn) {
        res.redirect('/login');
        return;
    }

    res.render('addGame');
});

// Handle form submission
router.post('/', (req, res) => {
    const loggedIn = req.session.loggedIn;

    if (!loggedIn) {
        res.redirect('/login');
        return;
    }

    const { title, developer, publisher, price, description } = req.body;

    // Check if any fields are empty
    if (!title || !developer || !publisher || !price || !description) {
        return res.status(400).send('All fields are required.');
    }

    // Check for duplicate entry
    pool.query('SELECT * FROM games WHERE title = ?', [title], (error, results) => {
        if (error) throw error;

        if (results.length > 0) {
            return res.status(400).send('Game already exists in the database.');
        }

        // Insert the game into the 'games' table
        const userId = req.session.userId; // Get the logged-in user ID from the session
        const game = { title, developer, publisher, price, description, user_id: userId }; // Include the user ID in the game data
        pool.query('INSERT INTO games SET ?', game, (error) => {
            if (error) throw error;

            res.redirect('/');
        });
    });
});

module.exports = router;
