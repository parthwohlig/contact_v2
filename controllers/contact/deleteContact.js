const express = require('express')
const router = express.Router()
const __constants = require('../../config/constants')
const validationOfAPI = require('../../middlewares/validation')
const Contact1 = require('../../services/Contact')

const validationSchema = {
  type: 'object',
  required: true,
  properties: {
    id: { type: 'string' }
  }
}

const validation = (req, res, next) => {
  return validationOfAPI(req, res, next, validationSchema, 'params')
}

const deleteContact = async (req, res) => {
  try {
    const person = await Contact1.deleteContact(req.params.id)
    if (!person) {
      res.status(400).json({ message: 'User not found with this id' })
    }
    return res.json({ person, type: __constants.RESPONSE_MESSAGES.SUCCESS })
  } catch (err) {
    return res.json({ type: err.type || __constants.RESPONSE_MESSAGES.SERVER_ERROR, err: err.err || err })
  }
}
router.delete('/:id', validation, deleteContact)

module.exports = router
