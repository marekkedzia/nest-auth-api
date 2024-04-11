import { Opaque } from 'ts-opaque';

type UserId = Opaque<string, 'user-id'>;
type Email = Opaque<string, 'email'>;
type FirstName = Opaque<string, 'first-name'>;
type LastName = Opaque<string, 'last-name'>;
type PhoneNumber = Opaque<string, 'phone-number'>;
type PreferredTechnology = Opaque<string, 'preferred-technology'>;
type UserCredentialsId = Opaque<string, 'user-credentials-id'>;
type ShirtSize = Opaque<string, 'shirt-size'>;

export {
  UserId,
  Email,
  FirstName,
  LastName,
  PhoneNumber,
  PreferredTechnology,
  ShirtSize,
  UserCredentialsId,
};
