const mongoose = require('mongoose')
const recipientSchema = require('./Recipient')
const { Schema } = mongoose
const surveySchema = new Schema({
    title:String,
    body:String,
    subject:String,
    recipients:[recipientSchema],//subdocument coollection cause mongoose has limit of 4mb
    yes:{type: Number, default:0 },
    no:{type: Number, default:0 },
    _user:{ type: Schema.Types.ObjectId, ref:'User'},/*tells schema that every survey will belong to a user who owns this record in users collection*/
    dateSent:Date,
    lastResponded:Date,
})
mongoose.model('surveys', surveySchema)