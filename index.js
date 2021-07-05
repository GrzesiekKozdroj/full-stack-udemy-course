const express = require('express')
const mongoose = require('mongoose')
const cookieSession = require('cookie-session')
const passport = require('passport')
const keys = require('./config/keys')
const bodyParser = require('body-parser')
require('./models/User')
require('./models/Survey')
require('./services/passport')

const PORT = process.env.PORT || 5000


mongoose.connect(keys.mongoURI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})

const app = express()
app.use(bodyParser.json())

app.use(cookieSession({maxAge:30 * 24 * 60 *60 * 1000, keys: [keys.cookieKey]    }))
app.use(passport.initialize())
app.use(passport.session())

require('./routes/authRoutes')(app)
require('./routes/billingRoutes')(app)
require('./routes/surveyRoutes')(app)

//only on heroku
if(process.env.NODE_ENV === 'production'){
    //make sure express serves prod assets like 
    //main.css and main.js files
    app.use(express.static('client/build'))

    //express will serve up html file if it doesnt recognise route
    const path = require('path')
    app.get('*', (req,res)=>{
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

app.listen(PORT, ()=>console.log(`listening on: http://localhost:${PORT}/`))