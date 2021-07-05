const _ = require('lodash')
const { Path } = require('path-parser')
const { URL } = require('url')//part of node
const mongoose = require('mongoose')
const requireLogin = require('../middlewares/requireLogin')
const requireCredits = require('../middlewares/requireCredits')
const Mailer = require('../services/Mailer')
const surveyTemplate = require('../services/emailTemplates/surveyTemplate')

const Survey = mongoose.model('surveys')

module.exports = app => {
    app.get('/api/surveys', requireLogin, async (req,res) => {
        const surveys = await Survey.find({
            _user:req.user.id
        }).select({
            recipients : false //do not include list of recipients....
        })
        res.send(surveys)
    })
    app.get('/api/surveys/:surveyId/:choice', (req,res)=>{
        res.send('Thanks for voting')
    })
    app.post('/api/surveys', requireLogin, requireCredits, async (req,res) => {
        console.log('survey recieved')
        const { title, subject, body, recipients } = req.body
        const survey = new Survey({
            title, 
            subject, 
            body, 
            recipients:recipients.split(',').map( email => ({ email: email.trim() }) ),
            _user:req.user.id,
            dateSent: Date.now()
        })
        //send emails here
        const mailer = new Mailer(survey,surveyTemplate(survey))
        try{
            await mailer.send()
            await survey.save()
            req.user.credits -= 1
            const user = await req.user.save()
            res.send(user)
        } catch (err) {
            res.status(422).send(err)
        }
    })
    app.post('/api/surveys/webhooks', (req,res)=>{ 
        const p = new Path('/api/surveys/:surveyId/:choice')//creates two variables from url
        // console.log(req.body)
        const eventMaker = (event)=>{
            //console.log(event)
            const match = p.test(new URL(event.url).pathname)
            if (match) {
                return {
                    email: event.email,
                    surveyId: match.surveyId,
                    choice: match.choice === 'Yes' ? 'yes' : 'no'
                }
            }
        }
        const dbSaver = event => {
            console.log('survey',event)
            Survey.updateOne({
                _id:event.surveyId,
                recipients:{
                    $elemMatch: { email: event.email, responded:false },//thats a mongoose inside objecct single element checker
                }
                }, { // this objects updates survey
                $inc: { [event.choice]: 1},
                $set: { 'recipients.$.responded': true },//finds key in key
                lastResponded: new Date()
            }).exec()
        }
        //const events = 
        _.chain(req.body) //lodash version of chanining functions, accepts initial array
            .map( e=>eventMaker(e) )//check if its valid url for click, and gets its value
            //.each(e=>console.log('befor compact',e))
            .compact()//filters all undefined email events
            .uniqBy('email','surveyId')//removes duplicates of email & surveyId so each click registers only once and is unique
            .each((e)=>{dbSaver(e)})
            .value()//pulls value off
        //    console.log(events)
        res.send({})//so sendgrid stops pings
    })
}

