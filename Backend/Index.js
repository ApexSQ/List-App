const express = require('express');
const cors = require("cors");
const mongoose = require('mongoose');

const app = express();

// Set up middleware
// Parse JSON request bodies
app.use(express.json());
// Parse URL-encoded request bodies
app.use(express.urlencoded({ extended : true }));
// Enable CORS for all origins
app.use(cors("*"));

// Import the ListApp model
const ListAppModel = require("./model/ListApp");

// MongoDB connection string
const ConnectionString = "mongodb+srv://djosh734:jdavies01@cluster0.0qmyd6j.mongodb.net/ListAppDB";

// Connect to the MongoDB database
mongoose.connect(ConnectionString)
  .then(() => {
    console.log("Connected to the database");
    // Start the server
    app.listen(3000, function () {
      console.log("Server running at port 3000");
    });
  })
  .catch((err) => console.log(err));

// CRUD Operations

// GET /lists - Retrieve all lists
app.get("/lists", async (req, res) => {
  try {
    // Find all items in the ListApp model
    const response = await ListAppModel.find({});
    console.log(response);
    // Send the response as JSON
    res.json(response);
  } catch (error) {
    console.log(error);
  }
});

// POST /lists - Create a new list item
app.post("/lists", async (req, res) => {
  try {
    // Log the request body
    console.log(req.body);
    // Create a new item in the ListApp model
    const newItem = await ListAppModel.create(req.body);
    // Send a success response
    res.status(200).send("Successful");
  } catch (error) {
    console.log(error);
    // Send a server error response
    res.status(500).send("Server Error");
  }
});

// DELETE /lists/:id - Delete a list item
app.delete("/lists/:id", async (req, res) => {
  try {
    // Get the ID from the request parameters
    const id = req.params.id;
    console.log(id);
    // Delete the item with the given ID
    const deleteItem = await ListAppModel.deleteOne({ _id: id });
    // Send a success response
    res.status(200).send("Delete success");
  } catch (error) {
    console.log(error);
    // Send a server error response
    res.status(500).send("Server Error");
  }
});

// PUT /lists/:id - Update a list item
app.put("/lists/:id", async (req, res) => {
  try {
    // Get the ID from the request parameters
    const id = req.params.id;
    // Get the text and status from the request body
    const { text, status } = req.body;
    // Update the item with the given ID
    const updatedItem = await ListAppModel.findByIdAndUpdate(
      id,
      { $set: { text: text, status: status } },
      { new: true, runValidators: true }
    );
    // If the item is not found, send a 404 response
    if (!updatedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }
    // Send the updated item as the response
    res.status(200).json(updatedItem);
  } catch (error) {
    console.log(error);
    // Send a server error response
    res.status(500).send("Server Error");
  }
});