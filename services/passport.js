
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const mongoose = require('mongoose')
const keys = require('../config/keys')
const User = mongoose.model('users')

passport.serializeUser( (user, done)=>{
    done(null, user.id)
} )

passport.deserializeUser( (id, done)=>{
    User.findById(id)
        .then(
            user=>done(null, user)
        )
} )

passport.use( 
    new GoogleStrategy({
        clientID:keys.googleClientID,
        clientSecret:keys.googleClientSecret,
        callbackURL: '/auth/google/callback',
        proxy:true
        }, 
        (accessToken, refreshToken, profile, done)=>{
            User.findOne({ googleId: profile.id })//This method allows me to scan through database! it returns promise!!!!
                .then((existingUser)=>{
                    if (existingUser){
                        //we already have a record with profile id
                        done(null, existingUser)
                    } else { //new user make new one!
                        new User({ googleId:profile.id})
                            .save()
                            .then(user => done(null, user) )
                    }
                })
        }) 
    ) //new instance of authentication with google

