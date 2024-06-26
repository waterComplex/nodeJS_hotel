const express = require('express');
const router = express.Router();
const MenuItem = require('./../models/MenuItem');

router.post('/', async (req, res) => {
    try {
        const data = req.body; // assuming we are getting the data (request body contains the data)
        // create a new Person document using the mongoose model
    
        const newMenuItem = new MenuItem(data);

        // save the newPerson to the database
        const response = await newMenuItem.save();
        console.log('menu item saved successfully');
        res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Internal server error"});
    }
})


router.get("/", async (req, res) => {
    try {
        const data = await MenuItem.find();
        console.log('menu items fetched successfully');
        res.status(200).json(data);
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Internal server error"});
    }
})

router.get('/:taste', async (req, res) => {
    try {
        const tasteType = req.params.taste;
        if (tasteType == 'spicy' || tasteType == 'salty' || tasteType == 'sweet' || tasteType == 'bitter' || tasteType == 'sour') {
            const response = await MenuItem.find({taste: tasteType});
            console.log('response fetched successfully');
            res.status(200).json(response);
        } else {
            res.status(404).json({error: "Invalid taste type"});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Internal server error"});
    }
})


router.put('/:id', async (req, res) => {
    try {
        const id = req.params.id; // Extract the ID from the request parameters
        const updatedMenuItemData = req.body; // Extract the updated menuItem data from the request body, only required fields will be passed/updated
        const response = await MenuItem.findByIdAndUpdate(id, updatedMenuItemData, {
            new: true, // return the newly updated document
            runValidators: true // run validation on the updated document according to the schema
        });

        if (!response) {
            // when id is not found
            return res.status(404).json({error: "menu item not found"});
        }

        console.log('menu item updated successfully');
        res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Internal server error"});
    }
})


router.delete('/:id', async (req, res) => {
    try {
        const menuItemId = req.params.id; // extracting id from url prameters
        // assuming Person has a model
        const response = await MenuItem.findByIdAndDelete(menuItemId);
        if (!response) {
            // when id is not found
            return res.status(404).json({error: "menuItem not found"});
        }
        console.log('menuItem deleted successfully');
        res.status(200).json({message: "menuItem deleted successfully"});
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Internal server error"});
    }
})
// comment
module.exports = router ;