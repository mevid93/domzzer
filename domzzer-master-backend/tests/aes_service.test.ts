import mongoose from 'mongoose';
import aesCryptoService from '../src/services/aesCryptoService';

jest.setTimeout(10000);

describe('encrypt()', () => {

  test('should be able to encrypt the text', () => {
    const text = 'The truth is out there...';
    const ciphtertext = aesCryptoService.encrypt(text);
    expect(ciphtertext).not.toEqual(text);
  });
});

describe('decrypt()', () => {

  test('should be able to decrypt the text', () => {
    const text = 'The truth is out there...';
    const ciphtertext = aesCryptoService.encrypt(text);
    expect(ciphtertext).not.toBeUndefined();
    if (ciphtertext === undefined) {
      return;
    }
    const decrypted = aesCryptoService.decrypt(ciphtertext);
    expect(decrypted).toEqual(text);
  });
});

afterAll(async () => {
  await mongoose.connection.close(true);
});