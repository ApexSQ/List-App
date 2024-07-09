const mongoose = require('mongoose');

//schema

const ListAppSchema = mongoose.Schema({

    text: {type: String, required: true},
})

const ListAppModel = mongoose.Model("ListApp", ListAppSchema)

module.exports = ListAppModel;