const express = require('express')

//const cors = require('cors')

const mongoose = require('mongoose');
const app = express()


// setting up middleware
app.use(express.json())
app.use(express.urlencoded({ extended : true }))


//app.use(cors("*")); 


// importing model 

const ListAppModel = require ( './models/List);' );


app.get("/", function (req, res) {
  res.send('Hello Nodmonkey')
})



const ConnectionString = "mongodb+srv://djosh734:jdavies01@cluster0.0qmyd6j.mongodb.net/";

mongoose.connect(ConnectionString, {}).then(() => {
  console.log("connected to database");

  app.listen(3000, function() {
    console.log('Server running on port 3000');
  });
})
.catch((error) => {
  console.error('Error connecting to database:', error);
});