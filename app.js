if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
  }
const express = require('express')
const app = express()
const port = process.env.PORT || 5000
const allRoutes = require('./routes/index.js')
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/', allRoutes)

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})