const mongoose = require('mongoose');
// Define the person schema
const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
    },
    work: {
        type: String,
        required: true,
        enum: ['chef', 'waiter', 'manager']
    },
    mobile: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String,
    },
    salary: {
        type: Number,
        required: true
    }
})


// Create the person model
const Person = mongoose.model('Person', personSchema);
module.exports = Person
