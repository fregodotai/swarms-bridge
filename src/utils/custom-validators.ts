import base58 from 'bs58';
import { registerDecorator, ValidationArguments } from 'class-validator';

export function IsSolanaPublicKey() {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isSolanaPublicKey',
      target: object.constructor,
      propertyName: propertyName,
      options: {
        message: `${propertyName} must be a valid Solana public key (Base58, 32 bytes)`,
      },
      validator: {
        validate(value: any) {
          if (typeof value !== 'string') return false;

          try {
            const decoded = base58.decode(value);
            return decoded.length === 32;
          } catch {
            return false;
          }
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be a valid Solana public key (Base58, 32 bytes)`;
        },
      },
    });
  };
}
