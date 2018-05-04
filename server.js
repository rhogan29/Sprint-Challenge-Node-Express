//importing
const express = require('express');
const action = require('./data/helpers/actionModel');
const project = require('./data/helpers/projectModel');

//server run
const server = express();

//middleware
server.use(express.json());


server.get('/', (req, res) => {
    console.log('Running');
    res.send('Running now!');
})

































const port = 5000;
server.listen(port, () => {console.log('== Server is listening on port 5000 ==')});