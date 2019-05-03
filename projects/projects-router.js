const express = require('express');

const db = require('../data/helpers/projectModel.js');
const router = express.Router()


router.get('/', (req, res) => {
    db
    .get()
    .then(projects => {
        res.status(200).json(projects)
    })
    .catch(err => {
        res.status(500).json({ message: "The projects could not be retrieved."})
    })
})


router.get('/:id', (req, res) => {
    const id = req.params.id;

    db
    .get(id)
    .then(project => {
        if(project) {
            res.status(200).json(project)
        } else {
            res.status(404).json({ message: "The project with the specified ID does not exist."})
        }  
    })
    .catch(err => {
        res.status(500).json({ message: "An error occurred retrieving the project with the specified ID."})
    })
})


router.post('/', (req, res) => {
    const { name, description } = req.body;

    if(!name || !description) {
        res.status(400).json({ message: "Please provide a name and description for this project."})
    }

    db
    .insert({ name, description })
    .then(project => {
        res.status(201).json(project)
    })
    .catch(err => {
        res.status(500).json({ message: "An error occurred creating the project."})
    })
})


router.delete('/:id', (req, res) => {
    const id = req.params.id;

    db
    .remove(id)
    .then(project => {
        if(project) {
            res.status(200).json(project)
        } else {
            res.status(404).json({ message: "The project with the specified ID does not exist."})
        }
    })
    .catch(err => {
        res.status(500).json({ message: "An error occurred deleting the project."})
    })
})


router.put('/:id', (req, res) => {
    const id = req.params.id;
    const { name, description } = req.body;

    if(!name || !description) {
        res.status(400).json({ message: "Please provide an updated name and description for this project."})
    }

    db
    .update(id, { name, description })
    .then(project => {
        if(project) {
            res.status(200).json(project)
        } else {
            res.status(404).json({ message: "The project with the specified ID does not exist."})
        }
    })
    .catch(err => {
        res.status(500).json({ message: "An error occurred updating the project."})
    })
})


router.get('/actions/:id', (req, res) => {
    const id = req.params.id;

    db
    .getProjectActions(id)
    .then(projectActions => {
        if(projectActions) {
            res.status(200).json(projectActions)
        } else {
            res.status(404).json({ message: "This project currently has no actions."})
        }
    })
    .catch(err => {
        res.status(500).json({ message: "An error occurred retrieving the project's actions."})
    })
})

module.exports = router;