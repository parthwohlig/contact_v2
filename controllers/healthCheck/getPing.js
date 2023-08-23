const express = require('express')
const router = express.Router()
const __constants = require('../../config/constants')
const validationOfAPI = require('../../middlewares/validation')
// const cache = require('../../middlewares/requestCacheMiddleware') // uncomment the statement whenever the redis cache is in use.

const validationSchema = {
}
const validation = (req, res, next) => {
  return validationOfAPI(req, res, next, validationSchema, 'query')
}
const ping = async (req, res) => {
  try {
    res.sendJson({ type: __constants.RESPONSE_MESSAGES.SUCCESS, data: true })
  } catch (err) {
    return res.sendJson({ type: err.type || __constants.RESPONSE_MESSAGES.SERVER_ERROR, err: err.err || err })
  }
}
router.get('/getPing', validation, ping)
// router.get('/getPing', cache.route(100), validation, ping) // example for redis cache in routes
module.exports = router
