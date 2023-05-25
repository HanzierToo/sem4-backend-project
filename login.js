const express = require('express');
const mysql = require('mysql');
const dbConfig = require('./dbConfig');
const router = express.Router();
const pool = mysql.createPool(dbConfig);

// Define the login route
router.get('/', (req, res) => {
    res.render('login');
});

router.post('/', (req, res) => {
    const { loginIdentifier, password } = req.body;

    // Validate the login identifier and password
    if (!loginIdentifier || !password) {
        const loggedIn = req.session && req.session.loggedIn;
        res.render('login', { error: 'Please provide both login identifier and password', loggedIn });
        return;
    }

    // Perform authentication logic using prepared statement
    const query = 'SELECT * FROM user WHERE (username = ? OR email = ?) AND password = ?';
    const values = [loginIdentifier, loginIdentifier, password];

    pool.query(query, values, (error, results) => {
        if (error) throw error;

        if (results.length > 0) {
            // Authentication successful
            req.session.loggedIn = true;
            req.session.userId = results[0].id;
            res.send("<script>alert('Logged In Successfully.'); window.location.href = '/'; </script>");
        } else {
            // Authentication failed
            const loggedIn = req.session && req.session.loggedIn;
            res.render('login', { error: 'Incorrect Username or Password. Please Try Again.', loggedIn });
        }
    });
});

module.exports = router;
