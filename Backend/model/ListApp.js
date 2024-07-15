const mongoose = require("mongoose");

// Schema
const ListAppSchema = mongoose.Schema({

  text: { type: String, required: true },
  status: { type: String, required: true },

});

const ListAppModel = mongoose.model("tasks", ListAppSchema);



module.exports = ListAppModel;
