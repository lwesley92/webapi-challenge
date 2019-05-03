const express = require('express');

const db = require('../data/helpers/actionModel.js');
const router = express.Router();


const noEssays = (req, res, next) => {
    if(req.body.description.length > 129) {
        res.status(404).json({ message: "No essays please, 128 characters max."})
    } else {
        next();
    }
}



router.get('/', (req, res) => {
    db
    .get()
    .then(actions => {
        res.status(200).json(actions)
    })
    .catch(err => {
        res.status(500).json({ message: "An error occurred getting the actions."})
    })
})


router.get('/:id', (req, res) => {
    const id = req.params.id;

    db
    .get(id)
    .then(action => {
        if(action) {
            res.status(200).json(action)
        } else {
            res.status(404).json({ message: "The action with the specified ID does not exist."})
        } 
    })
    .catch(err => {
        res.status(500).json({ message: "An error occurred getting the specified action."})
    })
})

router.post('/', noEssays, (req, res) => {
    const { project_id, description, notes }= req.body;

    if(!project_id || !description || !notes) {
        res.status(400).json({ message: "Please provide a valid project ID as well as a description and notes for this action."})
    }

    db
    .insert({ project_id, description, notes })
    .then(action => {
        res.status(201).json(action)
    })
    .catch(err => {
        res.status(500).json({ message: "An error occurred posting the new action."})
    })
})


router.delete('/:id', (req, res) => {
    const id = req.params.id;

    db
    .remove(id)
    .then(action => {
        if(action) {
            res.status(200).json(action)
        } else {
            res.status(400).json({ message: "The specified action does not exist."})
        }
    })
    .catch( err => {
        res.status(500).json({ message: "An error occurred deleting the specified action."})
    })
})


router.put('/:id', noEssays, (req, res) => {
    const id = req.params.id;
    const { description, notes } = req.body;

    if(!description || !notes) {
        res.status(400).json({ message: "Please provide an updated description and notes for this action."})
    }

    db
    .update(id, { description, notes})
    .then(action => {
        if(action) {
            res.status(200).json(action)
        } else {
            res.status(400).json({ message: "The specified action does not exist."})
        }
    })
    .catch(err => {
        res.status(500).json({ message: "An error occurred updating the specified action"})
    })
})

module.exports = router;