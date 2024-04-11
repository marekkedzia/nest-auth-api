import { LoginDto } from '../schemas/login.dto';
import { Email, UserId } from '../../user/schemas/user.types';
import { HashedPassword, Password } from '../../../utils/password.utils';
import { JwtToken } from '../schemas/jwt.types';

const testJwtToken = 'testJwtToken' as JwtToken;
const testUserId = 'testId' as UserId;
const testEmail = 'testEmail' as Email;
const testHashedPassword = 'testHashedPassword' as HashedPassword;
const testPassword = 'testPassword' as Password;

const testLoginDto: LoginDto = {
  email: testEmail,
  password: testPassword,
};

export {
  testLoginDto,
  testJwtToken,
  testUserId,
  testHashedPassword,
  testPassword,
  testEmail,
};
