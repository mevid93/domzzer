const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(result => {
  })
  .catch((error) => {
  })

const slaveSchema = new mongoose.Schema({
  name: String,
  address: String,
  status: String,
  testsDone: Number,
  vulnerabilitiesFound: Number
})


slaveSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Slave', slaveSchema)