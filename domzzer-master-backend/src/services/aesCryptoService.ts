import crypto from 'crypto';
import config from "../utils/config";

const ALGORITHM = 'aes-256-cbc';
const KEY = config.AES256_KEY;
const IV = 'WnZr4u7x!A%D*G-K';

const encrypt = (plaintext: string) => {
  if (plaintext === null || plaintext === undefined) {
    return undefined;
  }

  const cipher = crypto.createCipheriv(ALGORITHM, Buffer.from(KEY), IV);
  let encrypted = cipher.update(plaintext);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return encrypted.toString('hex');
};

const decrypt = (ciphertext: string) => {
  if (ciphertext === null || ciphertext === undefined) {
    return undefined;
  }

  const encryptedText = Buffer.from(ciphertext, 'hex');
  const decipher = crypto.createDecipheriv(ALGORITHM, Buffer.from(KEY), IV);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
};

export default { encrypt, decrypt };