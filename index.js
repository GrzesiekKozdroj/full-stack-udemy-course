const express = require('express')
const mongoose = require('mongoose')
const keys = require('./config/keys')
require('./models/User')
require('./services/passport')

const PORT = process.env.PORT || 5000


mongoose.connect(keys.mongoURI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})

const app = express()

require('./routes/authRoutes')(app)

app.listen(PORT, ()=>console.log(`listening on port: http://localhost:${PORT}/`))