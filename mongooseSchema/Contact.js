const mongoose = require('mongoose')
const Schema = mongoose.Schema
const timestamps = require('mongoose-timestamp-plugin')
const timestampsAppendObj = {
  createdName: 'createdAt', // default: 'createdAt'
  updatedName: 'updatedAt', // default: 'updatedAt'
  disableCreated: false, // Disables the logging of the creation date
  disableUpdated: false // Disabled the loggin of the modification date
}

const contactSchema = new Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
    ref: 'User'
  },
  name: {
    type: String,
    required: true
  },
  surname: {
    type: String
  },
  number: {
    type: Number,
    required: true,
    length: 10
  },
  dob: {
    type: String
  }

})
contactSchema.plugin(timestamps, timestampsAppendObj)
module.exports = mongoose.model('Contact', contactSchema)
