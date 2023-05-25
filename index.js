const express = require('express');
const session = require('express-session');
const mysql = require('mysql');
const app = express();
const dbConfig = require('./dbConfig');
const addGameRouter = require('./addGame');
const loginRouter = require('./login');
const registerRouter = require('./register');
const logoutRouter = require('./logout');

// Configure session middleware
app.use(
    session({
        secret: 'your-secret-key',
        resave: false,
        saveUninitialized: false
    })
);

// Create a MySQL pool to handle database connections
const pool = mysql.createPool(dbConfig);

// Set the view engine to use Pug templates
app.set('view engine', 'pug');
app.set('views', './views'); // Set the views directory path

// Parse request body
app.use(express.urlencoded({ extended: true }));

// Route for the index page
app.get('/', (req, res) => {
    const perPage = 2; // Number of games to display per page
    const page = parseInt(req.query.page) || 1; // Get the current page from query parameter (default: 1)

    const loggedIn = req.session.loggedIn;
    const userId = req.session.userId;

    if (!loggedIn) {
        res.redirect('/login');
        return;
    }

    // Fetch total count of games owned by the user
    const totalCountQuery = `SELECT COUNT(*) AS totalCount FROM games WHERE user_id = ${userId}`;

    pool.query(totalCountQuery, (error, totalCountResult) => {
        if (error) throw error;

        const totalCount = totalCountResult[0].totalCount;
        const totalPages = Math.ceil(totalCount / perPage);

        // Calculate offset and limit for the current page
        const offset = (page - 1) * perPage;
        const query = `SELECT * FROM games WHERE user_id = ${userId} LIMIT ${perPage} OFFSET ${offset}`;

        pool.query(query, (error, results) => {
            if (error) throw error;

            // Render the 'index.pug' template and pass the games data and pagination details to it
            res.render('index', {
                games: results,
                currentPage: page,
                totalPages: totalPages,
                loggedIn: loggedIn,
            });
        });
    });
});

app.use('/addGame', addGameRouter);

app.use('/login', loginRouter);

app.use('/register', registerRouter);

app.use('/logout', logoutRouter);

// Start the server
app.listen(3000, () => {
    console.log('Server started on port 3000');
});

app.use(express.static('public'));
