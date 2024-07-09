const express = require('express');
const cors = require("cors");
const mongoose = require('mongoose');
const app = express();

// setting up middleware
app.use(express.json())
app.use(express.urlencoded({ extended : true }))
app.use(cors());

// importing model
const ListAppModel = require("./model/ListApp");

const ConnectionString = "mongodb+srv://djosh734:jdavies01@cluster0.0qmyd6j.mongodb.net/ListAppDB";

mongoose.connect(ConnectionString).then(() => {
  console.log("connected to database");

  app.listen(3000, function() {
    console.log('Server running on port 3000');
  });
})
.catch((error) => {
  console.log('Error connecting to database:', error);
});

// CRUD Operations

// Get Method
app.get("/", async (req, res) => {
  try {
    const response = await ListAppModel.find({});
    console.log(response);
    res.json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Error fetching data', error: err.message });
  }
});