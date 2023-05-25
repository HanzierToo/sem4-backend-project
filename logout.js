const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
    // Destroy the session and redirect to the login page
    req.session.destroy((error) => {
        if (error) throw error;
        res.redirect('/login');
    });
});

module.exports = router;
