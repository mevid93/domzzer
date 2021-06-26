const crypto = require('crypto')
const config = require('../utils/config')

const ALGORITHM = 'aes-256-cbc'
const KEY = config.AES256_KEY
const IV = 'WnZr4u7x!A%D*G-K'

const encrypt = (plaintext) => {
  if (plaintext === null || plaintext === undefined) {
    return undefined
  }
  let cipher = crypto.createCipheriv(ALGORITHM, Buffer.from(KEY), IV)
  let encrypted = cipher.update(plaintext)
  encrypted = Buffer.concat([encrypted, cipher.final()])
  return encrypted.toString('hex')
}

const decrypt = (ciphertext) => {
  if (ciphertext === null || ciphertext === undefined) {
    return undefined
  }
  let encryptedText = Buffer.from(ciphertext, 'hex')
  let decipher = crypto.createDecipheriv(ALGORITHM, Buffer.from(KEY), IV)
  let decrypted = decipher.update(encryptedText)
  decrypted = Buffer.concat([decrypted, decipher.final()])
  return decrypted.toString()
}

module.exports = { encrypt, decrypt }