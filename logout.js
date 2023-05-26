const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
    req.session.destroy((error) => {
        if (error) throw error;
        res.redirect('/login');
    });
});

module.exports = router;
