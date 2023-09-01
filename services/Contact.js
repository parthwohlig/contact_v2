const Contact = require('../mongooseSchema/Contact')

class ContactClass {
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

  async getContactId (id) {
    try {
      const person = await Contact.findById(id)
      return person
    } catch (error) {
      console.log(`Error getting user with ${id}`, error)
      throw new Error(error)
    }
  }

  async updateContact (id, updatedData) {
    try {
      const updatedContact = await Contact.findByIdAndUpdate(id, updatedData, { new: true })
      return updatedContact
    } catch (error) {
      console.log(`error updating user with ${id}`, error)
      throw new Error(error)
    }
  }

  async deleteContact (id) {
    try {
      const deleteContact = await Contact.findByIdAndDelete(id)
      return deleteContact
    } catch (error) {
      console.log(`error deleteing the user with ${id}`)
      throw new Error(error)
    }
  }
}

module.exports = new ContactClass()
