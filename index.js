const express = require('express');
const session = require('express-session');
const mysql = require('mysql');
const app = express();
const dbConfig = require('./dbConfig');
const addGameRouter = require('./addGame');
const loginRouter = require('./login');
const registerRouter = require('./register');
const logoutRouter = require('./logout');
const editGameRouter = require('./editGame')
const deleteGameRouter = require('./deleteGame');

// Postman Routes -- Returns only JSON
const findAllRouter = require('./findAll');
const findOneRouter = require('./findOne');
const updateRouter = require('./update');
const createRouter = require('./create');
const deleteRouter = require('./delete');

app.use(
    session({
        secret: 'your-secret-key',
        resave: false,
        saveUninitialized: false
    })
);

const pool = mysql.createPool(dbConfig);

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    const perPage = 2;
    const page = parseInt(req.query.page) || 1;
    const searchQuery = req.query.search || '';

    const loggedIn = req.session.loggedIn;
    const userId = req.session.userId;

    if (!loggedIn) {
        res.redirect('/login');
        return;
    }

    const totalCountQuery = `SELECT COUNT(*) AS totalCount FROM games WHERE user_id = ${userId}`;

    pool.query(totalCountQuery, (error, totalCountResult) => {
        if (error) throw error;

        const totalCount = totalCountResult[0].totalCount;
        const totalPages = Math.ceil(totalCount / perPage);

        const offset = (page - 1) * perPage;
        let query = `SELECT * FROM games WHERE user_id = ${userId}`;

        if (searchQuery) {
            query += ` AND (title LIKE '%${searchQuery}%' OR developer LIKE '%${searchQuery}%' OR publisher LIKE '%${searchQuery}%' OR description LIKE '%${searchQuery}%')`;
        }

        query += ` LIMIT ${perPage} OFFSET ${offset}`;

        pool.query(query, (error, results) => {
            if (error) throw error;

            res.render('index', {
                games: results,
                currentPage: page,
                totalPages: totalPages,
                loggedIn: loggedIn,
                searchQuery: searchQuery,
            });
        });
    });
});

app.use('/addGame', addGameRouter);

app.use('/login', loginRouter);

app.use('/register', registerRouter);

app.use('/logout', logoutRouter);

app.use('/editGame', editGameRouter);

app.use('/deleteGame', deleteGameRouter);

app.use('/findAll', findAllRouter);

app.use('/findOne', findOneRouter);

app.use('/update', updateRouter);

app.use('/create', createRouter);

app.use('/delete', deleteRouter);

app.listen(3000, () => {
    console.log('Server started on port 3000');
});

app.use(express.static('public'));
