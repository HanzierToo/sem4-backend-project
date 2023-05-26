const express = require('express');
const mysql = require('mysql');
const dbConfig = require('./dbConfig');
const router = express.Router();
const pool = mysql.createPool(dbConfig);
const bcrypt = require('bcrypt');

router.get('/', (req, res) => {
    res.render('register');
});

router.post('/', (req, res) => {
    const { username, password, email } = req.body;

    if (!username || !password || !email) {
        return res.render('register', { error: 'All Fields Are Required.' });
    }

    const checkQuery = 'SELECT * FROM user WHERE username = ? OR email = ?';
    pool.query(checkQuery, [username, email], (error, results) => {
        if (error) throw error;

        if (results.length > 0) {
            return res.render('register', { error: 'Username or Email Already Exists.' });
        }

        bcrypt.hash(password, 10, (err, hashedPassword) => {
            if (err) throw err;

            const user = { username, password: hashedPassword, email };
            const insertQuery = 'INSERT INTO user SET ?';
            pool.query(insertQuery, user, (error) => {
                if (error) throw error;

                res.send("<script>alert('Registered Successfully. Please Log In.'); window.location.href = '/login'; </script>");
            });
        });
    });
});

module.exports = router;
