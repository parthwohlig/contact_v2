const express = require('express')
const router = express.Router()
const __constants = require('../../config/constants')
const validationOfAPI = require('../../middlewares/validation')
const User1 = require('../../services/user')

const validationSchema = {
  username: {
    type: String,
    required: false
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
}

const validation = (req, res, next) => {
  return validationOfAPI(req, res, next, validationSchema, 'body')
}

const createUser = async (req, res) => {
  try {
    const user = await User1.createUser(req, res)
    return res.json({ user, type: __constants.RESPONSE_MESSAGES.SUCCESS })
  } catch (err) {
    console.log(err)
    return res.json({ type: err.type || __constants.RESPONSE_MESSAGES.SERVER_ERROR, err: err.message || err })
  }
}
router.post('/create', validation, createUser)

const loginUser = async (req, res) => {
  try {
    const user = await User1.loginUser(req, res)
    return res.json({ user, type: __constants.RESPONSE_MESSAGES.SUCCESS })
  } catch (e) {
    return res.json({ type: e.type || __constants.RESPONSE_MESSAGES.SERVER_ERROR, err: e.message || e })
  }
}
router.post('/login', validation, loginUser)

module.exports = router
