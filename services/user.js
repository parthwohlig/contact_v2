const User = require('../mongooseSchema/user')
const bcrypt = require('bcrypt')
const token = require('../middlewares/auth/authentication')

class UserClass {
  async createUser (req, res) {
    const { username, email, password } = req.body
    const userAvailable = await User.findOne({ email })
    if (userAvailable) {
      // return res.status(400).json({ message: 'User already created' })
      throw new Error('User already created')
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await User.create({
      username,
      email,
      password: hashedPassword
    })
    await user.save()
    if (user) {
      const userData = { _id: user.id, email: user.email }
      return userData
    }
  }

  async loginUser (req, res) {
    const { email, password } = req.body
    if (!email || !password) {
      res.status(400).json({ message: 'All fields are mandatory' })
    }
    const user = await User.findOne({ email })
    if (user && (await bcrypt.compare(password, user.password))) {
      const accessToken = token.setToken({
        user: {
          username: user.username,
          email: user.email,
          id: user.id
        }
      }, 6000)
      return accessToken
    } else {
      res.status(400).json({ message: 'Email and password not matching' })
    }
  }
}
module.exports = new UserClass()
