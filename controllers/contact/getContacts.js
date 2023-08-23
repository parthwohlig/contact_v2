const express = require('express')
const router = express.Router()
const __constants = require('../../config/constants')
const validationOfAPI = require('../../middlewares/validation')
const Contact1 = require('../../services/Contact')
const validationSchema = {
  // name: {
  //   type: String,
  //   required: true
  // },
  // surname: {
  //   type: String,
  //   required: true
  // },
  // number: {
  //   type: Number,
  //   required: true
  // },
  // dob: {
  //   type: String
  // }
}
const validation = (req, res, next) => {
  return validationOfAPI(req, res, next, validationSchema, 'query')
}
const getContact = async (req, res) => {
  try {
    const person = await Contact1.getContact()
    return res.status(200).json({ person, type: __constants.RESPONSE_MESSAGES.SUCCESS })
    // return res.send('test')
  } catch (err) {
    return res.json({ type: err.type || __constants.RESPONSE_MESSAGES.SERVER_ERROR, err: err.err || err })
  }
}
router.get('/', validation, getContact)

module.exports = router
