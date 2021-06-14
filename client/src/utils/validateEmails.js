const RE = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const validator = emails => {
    let invalidEmails = emails
        .split(',')
        .map(email=>email.trim())
        .filter( email => !RE.test(email) )
    if(invalidEmails.length){
        return `Th${invalidEmails.length>1?'ese emails are':'is email is'} invalid`
    } 
    return
}

export default validator