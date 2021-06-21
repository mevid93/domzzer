const mongoose = require('mongoose')
const aesCryptoService = require('../services/aesCryptoService')

jest.setTimeout(10000)

describe('encrypt()', () => {

  test('should be able to encrypt the text', async () => {
    const text = 'The truth is out there...'
    const ciphtertext = aesCryptoService.encrypt(text)
    expect(ciphtertext).not.toEqual(text)
  })
})

describe('decrypt()', () => {

  test('should be able to decrypt the text', async () => {
    const text = 'The truth is out there...'
    const ciphtertext = aesCryptoService.encrypt(text)
    const decrypted = aesCryptoService.decrypt(ciphtertext)
    expect(decrypted).toEqual(text)
  })
})

afterAll(() => {
  mongoose.connection.close()
})