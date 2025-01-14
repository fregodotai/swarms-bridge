import * as crypto from 'crypto';

import config from '../config/config';

const ENCRYPTION_KEY = config.encryptionKey;
const IV_LENGTH = 16;

if (!ENCRYPTION_KEY) {
  throw new Error('Encryption key is not set');
}

export function encryptPrivateKey(privateKey: string): string {
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv(
    'aes-256-cbc',
    Buffer.from(ENCRYPTION_KEY!, 'hex'),
    iv,
  );
  let encrypted = cipher.update(privateKey);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return iv.toString('hex') + ':' + encrypted.toString('hex');
}

export function decryptPrivateKey(encryptedPrivateKey: string): string {
  const [iv, encrypted] = encryptedPrivateKey.split(':');
  const decipher = crypto.createDecipheriv(
    'aes-256-cbc',
    Buffer.from(ENCRYPTION_KEY!, 'hex'),
    Buffer.from(iv, 'hex'),
  );
  let decrypted = decipher.update(Buffer.from(encrypted, 'hex'));
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
}
