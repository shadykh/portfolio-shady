'use strict';



const express = require('express');

const server = express();

const PORT = process.env.PORT || 5000;

server.get('/', (request, response) => {
    response.send('You are in the Home');
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


server.use(express.static('./public'));

server.listen(PORT, () => console.log(`Listening on port ${PORT}`));
