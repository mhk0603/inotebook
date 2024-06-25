const connectToMongo=require('./db');
const express = require('express')

connectToMongo();
const app = express()
const port = 3000

app.use(express.json()) // to use req.body u need to write this middleware then u will not get undefined in console and now u can deal in json

// available routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

// app.get('/', (req,res)=>
//   res.send("hello")

//   )


app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})

