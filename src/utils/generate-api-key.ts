import { randomBytes } from 'crypto';

export default function generateApiKey() {
  return randomBytes(32).toString('hex');
}
