
const errorHandler = (error, req, res, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  }

  if (error.name === 'MongooseServerSelectionError') {
    return res.status(500).send({ error: 'database unavailable' })
  }

  if (error.name === 'MongooseError') {
    return res.status(500).send({ error: 'database error' })
  }

  next(error)
}

module.exports = errorHandler