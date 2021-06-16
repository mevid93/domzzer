const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const slaveSchema = new mongoose.Schema({
  name: { type: String, minlength: 3, required: true },
  address: { type: String, minlength: 10, required: true, unique: true },
  status: { type: String, minlength: 3, required: true },
  testsDone: { type: Number, minimum: 0, required: true },
  vulnerabilitiesFound: { type: Number, minimum: 0, required: true },
})
slaveSchema.plugin(uniqueValidator)

slaveSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Slave', slaveSchema)