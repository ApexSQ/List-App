const express = require('express')
const app = express()
const cors = require('cors')

app.get('/', function (req, res) {
  res.send('Hello Nodmonkey')
})

app.listen(3000, function () {
    console.log('listening on port 3000');

})

// setting up middleware

app.use(express.json())
app.use(express.urlencoded({ extended : true }))

app.use(cors("*")); 