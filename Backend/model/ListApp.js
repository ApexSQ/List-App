// Import the Mongoose library
const mongoose = require("mongoose");

// Define the schema for the ListApp model
const ListAppSchema = mongoose.Schema({
  // 'text' field, required, and of type String
  text: { type: String, required: true },
  // 'status' field, required, and of type String
  status: { type: String, required: true }
});

// Create the model for the 'tasks' collection based on the ListAppSchema
const ListAppModel = mongoose.model("tasks", ListAppSchema);

// Export the ListAppModel for use in other parts of the application
module.exports = ListAppModel;