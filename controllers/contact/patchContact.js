const express = require('express')
const router = express.Router()
const __constants = require('../../config/constants')
const validationOfAPI = require('../../middlewares/validation')
const Contact1 = require('../../services/Contact')

const validationSchema = {
  name: {
    type: String,
    required: true
  },
  surname: {
    type: String
  },
  number: {
    type: Number,
    required: true
  },
  dob: {
    type: String
  }
}

const validation = (req, res, next) => {
  return validationOfAPI(req, res, next, validationSchema, 'body')
}

const putContact = async (req, res) => {
  try {
    const person = await Contact1.updateContact(req.params.id, req.body)
    if (!person) {
      res.json({ messaage: 'Requested user not found' })
    }
    return res.json({ person, type: __constants.RESPONSE_MESSAGES.SUCCESS })
  } catch (err) {
    return res.json({ type: err.type || __constants.RESPONSE_MESSAGES.SERVER_ERROR, err: err.err || err })
  }
}
router.patch('/:id', validation, putContact)

module.exports = router
