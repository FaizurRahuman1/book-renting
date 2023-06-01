const express = require('express')
require('dotenv').config()
const cookieParser = require('cookie-parser')
const cors = require('cors')
const connect = require('./db/connect')
const PORT = process.env.PORT

const app = express()

//body parser settings
app.use(express.urlencoded({extended: true}))
app.use(express.json())

//middlewares
app.use(cors()) // cross origin resources sharing to allow incoming requests

//index route
app.use(`/api/auth`, require('./route/authRoute'))

//default route
app.all(`**`, async (req,res) => {
    return res.status(404).json({msg: `requested path not found ..404 error`})
})

//to start the server
app.listen(PORT, async () => {

    console.log(`server is up and running @ http://localhost:${PORT}`)
    await connect()
})