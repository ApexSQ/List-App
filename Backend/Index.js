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
app.get("/lists", async (req, res) => {
  try {
    const response = await ListAppModel.find({});
    console.log(response);
    res.json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Error fetching data', error: err.message });
  }
});


// Create Method PostMethod

app.post("/lists", async (req, res) => {
  try {

    console.log(req.body);

    const list = req.body;
   
    const newItem = await ListAppModel.create(list);

    res.status(200).send( "successfull");
    
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Error fetching data', error: err.message });
  }

});


//delete Method

app.delete("/lists/:id", async (req, res) => {
  try {

    let id = req.params.id;
    console.log(id);

    const deleteItem = await ListAppModel.deleteOne({
      _id: id
    });

    res.status(200).send( " DELETE success")

    
    
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Error fetching data', error: err.message });
  }

});

// put Method


app.put("/lists/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { text } = req.body;

    const updatedItem = await ListAppModel.findByIdAndUpdate(
      id,
      { $set: { text: text } },
      { new: true, runValidators: true }
    );

    if (!updatedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }

    res.status(200).json(updatedItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating item', error: error.message });
  }
});
