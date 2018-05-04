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

server.post('/api/projects', (req, res) => {
    const { name, description } = req.body;
    const addedProject = { name, description } //new name and description being added to project
    project
    .insert(addedProject) // inserting new name and description
    .then(response => {
        res.status(200).json({ response })
    })
    .catch(err => {
        res.status(500).json({ Error: err })
    })
});

// projectmodel -- put 

server.put('/api/projects/:id', (req, res) => {
    const id = req.params.id;
    const update = req.body;
    project
    .update(id, update)
    .then(response => {
        res.status(200).json({ update })
    })
    .catch(err => {
        res.status(500).json({ Error: err })
    })
});


// projectmodel -- delete

server.delete('/api/projects/:id', (req, res) => {
    const id = req.params.id;
    let nowDeleted;
    project
    .get(id)
    .then(action => {
        nowDeleted = {...action[0]};
        project
        .remove(id)
        .then(actions => {
            res.status(200).json(nowDeleted);
        })
        .catch(err => {
            res.status(500).json({ Error: err })
        })
    })
});

//########################################################################### ACTIONS ####### #############################################################################

// actions -- get

server.get('/api/actions', (req, res) => {
    action 
    .get()
    .then(response => {
        res.status(200).json({ response })
    })
    .catch(err => {
        res.status(500).json({ Error: err })
    })
});

// actions -- get -- id

server.get('/api/actions/:id', (req, res) => {
    const id = req.params.id;
    action
    .get(id)
    .then(response => {
        res.status(200).json({ response })
    })
    .catch(err => {
        res.status(500).json({ Error: err })
    })
});

// actions -- post

server.post('/api/actions', (req, res) => {
    const { project_id, description, notes } = req.body;
    const addAction = { project_id, description, notes };
    action
    .insert(addAction)
    .then(response => {
        res.status(200).json({ response })
    })
    .catch(err => {
        res.status(500).json({ Error: err })
    })
});

// actions -- put

server.put('/api/actions/:id', (req, res) => {
    const id = req.params.id;
    const update = req.body;
    action 
    .update(id, update)
    .then(response => {
        res.status(200).json({ response })
    })
    .catch(err => {
        res.status(500).json({ Error: err })
    })
});

// actions -- delete

server.delete('/api/actions/:id', (req, res) => {
    const id = req.params.id;
    let newDeleted;
    action.get(id)
    .then(myAction => {
        newDeleted = {...myAction[0]};
        action
        .remove(id)
        .then(actions => {
            res.status(200).json(newDeleted);
        })
        .catch(err => {
            res.status(500).json({ Error: err })
        })
    })
});

// completed all main goals for this API.

const port = 5000;
server.listen(port, () => {console.log('== Server is listening on port 5000 ==')});