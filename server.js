// CREATING A SERVER
const express = require('express')
const app = express()
const db = require('./db');
require('dotenv').config()


const bodyParser = require('body-parser');
app.use(bodyParser.json()); // stores the data in json format into the req.body
const PORT = process.env.PORT || 3000;

const MenuItem = require('./models/MenuItem');


app.get('/', function (req, res) {
  res.send('Welcome to our hotel, happy happy happy')
})



// import the person route
const personRoutes = require('./routes/personRoutes');
const MenuItemRoutes = require('./routes/menuItemRoutes');

// Use the routers
app.use('/person', personRoutes);
app.use('/menu', MenuItemRoutes);

app.listen(PORT, () => {
    console.log('your server is running at port 3000')
})
 





/*
{
    "name": "Dwight",
    "age": 45,
    "work": "chef",
    "mobile": "123-458899",
    "email": "dwight@mail.com",
    "address": "scranton city",
    "salary": 40000
}
*/




