import { CreateUserDto } from '../schemas/create.user.dto';
import {
  testEmail,
  testUserId,
  testPassword,
} from '../../auth/tests/test.data';
import { CreateUserCredentialsDto } from '../schemas/user.credentials.dto';
import {
  FirstName,
  LastName,
  PhoneNumber,
  PreferredTechnology,
  ShirtSize,
  UserCredentialsId,
} from '../schemas/user.types';
import { UserCredentials } from '../store/entities/user.credentials.entity';

const testCreateUserDto: CreateUserDto = {
  email: testEmail,
  password: testPassword,
};

const firstName = 'testFirstName' as FirstName;
const lastName = 'testLastName' as LastName;
const phoneNumber = 'testPhoneNumber' as PhoneNumber;
const shirtSize = 'testShirtSize' as ShirtSize;
const preferredTechnology = 'testPreferredTechnology' as PreferredTechnology;
const testCreateUserCredentialsDto: CreateUserCredentialsDto = {
  firstName,
  lastName,
  phoneNumber,
  shirtSize,
  preferredTechnology,
};
const testUserCredentialsList: UserCredentials[] = [
  {
    id: 'testUserCredentialsId' as UserCredentialsId,
    userId: testUserId,
    firstName,
    lastName,
    phoneNumber,
    shirtSize,
    preferredTechnology,
  },
];

export {
  testCreateUserDto,
  testCreateUserCredentialsDto,
  testUserCredentialsList,
};
