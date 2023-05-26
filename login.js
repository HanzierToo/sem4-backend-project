const express = require('express');
const mysql = require('mysql');
const dbConfig = require('./dbConfig');
const router = express.Router();
const pool = mysql.createPool(dbConfig);
const bcrypt = require('bcrypt');

router.get('/', (req, res) => {
    res.render('login');
});

router.post('/', (req, res) => {
    const { loginIdentifier, password } = req.body;

    if (!loginIdentifier || !password) {
        return res.render('login', { error: 'Please provide both login identifier and password' });
    }

    const query = 'SELECT * FROM user WHERE username = ? OR email = ?';
    pool.query(query, [loginIdentifier, loginIdentifier], (error, results) => {
        if (error) throw error;

        if (results.length === 0) {
            return res.render('login', { error: 'Incorrect Username or Password. Please Try Again.' });
        }

        const user = results[0];

        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) throw err;

            if (isMatch) {
                req.session.loggedIn = true;
                req.session.userId = user.id;
                res.send("<script>alert('Logged In Successfully.'); window.location.href = '/'; </script>");
            } else {
                res.render('login', { error: 'Incorrect Username or Password. Please Try Again.' });
            }
        });
    });
});

module.exports = router;
