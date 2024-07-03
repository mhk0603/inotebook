const connectToMongo=require('./db');
const express = require('express')
var cors=require('cors')

connectToMongo();
const app = express()
const port = 5000

app.use(cors())
app.use(express.json())

app.use(express.json()) // to use req.body u need to write this middleware then u will not get undefined in console and now u can deal in json

// available routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

// app.get('/', (req,res)=>
//   res.send("hello")

//   )


app.listen(port, () => {
  console.log(`iNotebook app listening on port http://localhost:${port}`)
})

