const mongoose = require("mongoose");

// Schema
const ListAppSchema = mongoose.Schema({

  text: { type: String, required: true }
  
});

const ListAppModel = mongoose.model("Tasks", ListAppSchema);

module.exports = ListAppModel;