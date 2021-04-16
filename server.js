'use strict';


/**
 * Dependencies
 */

require('dotenv').config();

const express = require('express');

const superagent = require('superagent');

const pg = require('pg');

const server = express();

const PORT = process.env.PORT || 3800;

server.use(express.urlencoded({ extended: true }));

server.use(express.static('./public'))

server.set('view engine', 'ejs');

/**
 * SQL-DB connect
 */

//const client = new pg.Client(process.env.DATABASE_URL);

const client = new pg.Client({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });


/**
 * Routes
 */


server.get('/', (request, response) => {
    //response.send('You are in the Home');
    response.render('pages/index');
});

server.post('/contact', (request, response) => {
    //response.send('You are in the Home');
    let data = request.body;
    console.log(data);
    let { name, email, message } = request.body;
    let SQL = `INSERT INTO messages (name, email, message) VALUES ($1,$2,$3);`;
    let safeValues = [name, email, message];
    client.query(SQL, safeValues)
        .then(result => {
            //console.log(result.rows[0].id)
            response.redirect('/');
        })


});

server.get('/hello', (request, response) => {
    response.send('Hello');
});

server.get('/test', (request, response) => {
    response.send('The server is getting fire');
});

server.get('/data', (request, response) => {
    let test = [
        {
            server: true,
            server_js: true,
            crash: false,
        },
        {
            time: 100,
            date: 'Today is not as Yesterday',
            isNeedTime: false,
        }

    ]
    response.json(test);
});


/**
 * Check if DB/PORT are connetecd
 */


client.connect()
    .then(() => {
        server.listen(PORT, () => {
            console.log(`Listening on PORT ${PORT}`)
        })
    })

