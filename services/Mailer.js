const sendgrid = require('sendgrid')
const helper = sendgrid.mail
const keys = require('../config/keys')

class Mailer extends helper.Mail {
    constructor({ subject, recipients }, content){
        super()

        this.sgApi = sendgrid(keys.sendGridKey)
        this.from_email = new helper.Email('gregkozdroj@gmail.com')
        this.subject = subject
        this.body = new helper.Content('text/html', content)
        this.recipients = this.formatAddresses(recipients)//an array of 'helper' objects

        this.addContent(this.body)//builds email body f provided by Mailer base class
        this.addClickTracking()
        this.addRecipients()
    }
    formatAddresses(recipients){ //formats email object from {email:email}
        return recipients.map( ({ email }) => {//into what sendGrid wants
            return new helper.Email(email)//helpers come from sendgrid
        })
    }
    addClickTracking () {//adds click tracking inside emails
        const trackingSettings = new helper.TrackingSettings()
        const clickTracking = new helper.ClickTracking(true, true)

        trackingSettings.setClickTracking(clickTracking)
        this.addTrackingSettings(trackingSettings)
    }
    addRecipients(){
        const personalize = new helper.Personalization()
        this.recipients.forEach(
            recipient => personalize.addTo(recipient)
        )
        this.addPersonalization(personalize)
    }

    async send(){
        const request = this.sgApi.emptyRequest({
            method:'POST',
            path: '/v3/mail/send',
            body:this.toJSON()
        })
        try{
            const response = await this.sgApi.API(request)
            return response
        }catch(error){
            console.log(error)
            if(error.response){
                console.log(error.response.body)
            }
        }
    }
}
module.exports = Mailer