const mongoose = require('mongoose')
const Schema = mongoose.Schema
const timestamps = require('mongoose-timestamp-plugin')
const timestampsAppendObj = {
  createdName: 'createdAt', // default: 'createdAt'
  updatedName: 'updatedAt', // default: 'updatedAt'
  disableCreated: false, // Disables the logging of the creation date
  disableUpdated: false // Disabled the loggin of the modification date
}

const userSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
})
userSchema.plugin(timestamps, timestampsAppendObj)
module.exports = mongoose.model('User', userSchema)
