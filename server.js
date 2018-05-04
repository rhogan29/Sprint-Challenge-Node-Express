//importing
const express = require('express');

//server run
const server = express();

//locations
const action = require('./data/helpers/actionModel');
const project = require('./data/helpers/projectModel');

//middleware
server.use(express.json());


server.get('/', (req, res) => {
    console.log('Running');
    res.send('Running now!');
})


//########################################################################### PROJECT MODEL #############################################################################

// projectmodel -- get 
server.get('/api/projects', (req, res) => {
    project
    .get()
    .then(response => {
        res.status(200).json({ response })
    })
    .catch(err => {
        res.status(500).json({ Error: err })
    })
})

// projectmodel -- get -- id
server.get('/api/projects/:id', (req, res) => {
    const id = req.params.id;
    project
    .get(id)
    .then(response => {
        if(response === undefined) {
            res.status(404).json({ message: response })
        } else {
            res.status(200).json({ response })
        }
    })
    .catch(err => {
        res.status(500).json({ Error: err })
    })
});

// projectmodel -- get -- actions

server.get('/api/projects/:id/actions', (req, res) => {
    const id = req.params.id;
    project
    .getProjectActions(id)
    .then(response => {
        res.status(200).json({ response })
    })
    .catch(err => {
        res.status(500).json({ Error: err })
    })
});

// projectmodel -- post

server.post('');


































const port = 5000;
server.listen(port, () => {console.log('== Server is listening on port 5000 ==')});