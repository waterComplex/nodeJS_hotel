const express = require('express');
const router = express.Router();
const Person = require('./../models/Person');

router.post('/', async (req, res) => {
    try {
        const data = req.body; // assuming we are getting the data (request body contains the data)
        // create a new Person document using the mongoose model
    
        const newPerson = new Person(data);

        // save the newPerson to the database
        const response = await newPerson.save();
        console.log('data saved successfully');
        res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Internal server error"});
    }
})


// GET method to get the person
router.get("/", async (req, res) => {
    try {
        const data = await Person.find();
        console.log('data fetched successfully');
        res.status(200).json(data);
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Internal server error"});
    }
})


router.get('/:workType', async (req, res) => {
    try {
        const workType = req.params.workType;
        if (workType == 'chef' || workType == 'waiter' || workType == 'manager') {
            const response = await Person.find({work: workType});
            console.log('response fetched successfully');
            res.status(200).json(response);
        } else {
            res.status(404).json({error: "Invalid work type"});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Internal server error"});
    }
})

router.put('/:id', async (req, res) => {
    try {
        const id = req.params.id; // Extract the ID from the request parameters
        const updatedPersonData = req.body; // Extract the updated preson data from the request body, only required fields will be passed/updated
        const response = await Person.findByIdAndUpdate(id, updatedPersonData, {
            new: true, // return the newly updated document
            runValidators: true // run validation on the updated document according to the schema
        });

        if (!response) {
            // when id is not found
            return res.status(404).json({error: "Person not found"});
        }

        console.log('data updated successfully');
        res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Internal server error"});
    }
})


router.delete('/:id', async (req, res) => {
    try {
        const personId = req.params.id; // extracting id from url prameters
        // assuming Person has a model
        const response = await Person.findByIdAndDelete(personId);
        if (!response) {
            // when id is not found
            return res.status(404).json({error: "Person not found"});
        }
        console.log('person deleted successfully');
        res.status(200).json({message: "Person deleted successfully"});
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Internal server error"});
    }
})
module.exports = router ;