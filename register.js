const express = require('express');
const mysql = require('mysql');
const dbConfig = require('./dbConfig');
const router = express.Router();
const pool = mysql.createPool(dbConfig);

// Define the register route
router.get('/', (req, res) => {
    res.render('register');
});

router.post('/', (req, res) => {
    const { username, password, email } = req.body;

    // Validate the registration data
    if (!username || !password || !email) {
        res.render('register', { error: 'Please provide all the registration details' });
        return;
    }

    // Check if the username or email already exists in the database
    const checkQuery = 'SELECT * FROM user WHERE username = ? OR email = ?';
    const checkValues = [username, email];

    pool.query(checkQuery, checkValues, (checkError, checkResults) => {
        if (checkError) throw checkError;

        if (checkResults.length > 0) {
            res.render('register', { error: 'Username or Email Already Exists' });
        } else {
            // Insert the new user into the database
            const insertQuery = 'INSERT INTO user (username, password, email) VALUES (?, ?, ?)';
            const insertValues = [username, password, email];

            pool.query(insertQuery, insertValues, (insertError, insertResults) => {
                if (insertError) throw insertError;

                // Registration successful
                res.send("<script>alert('Registered Successfully. Please Log In.'); window.location.href = '/login'; </script>");
                // res.render('login', { success: 'Registered Successfully. Please Log In.' }); -- Doesn't work =(
            });
        }
    });
});

module.exports = router;
