const Contact = require('../mongooseSchema/Contact')

class GetContactClass {
  async getContact () {
    try {
      const person = await Contact.find({})
      return person
    } catch (err) {
      console.log('Error in getting contact :: err', err)
      throw new Error(err)
    }
  }

  async createContact (body) {
    try {
      const { name, surname, number, dob } = body
      const person = await Contact.create({
        name,
        surname,
        number,
        dob
      })
      await person.save()
      return person
    } catch (error) {
      console.log('Error in creating contact :: err ', error)
      throw new Error(error)
    }
  }
}

module.exports = new GetContactClass()
