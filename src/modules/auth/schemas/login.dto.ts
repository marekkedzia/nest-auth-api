import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Email } from '../../user/schemas/user.types';
import { Password } from '../../../utils/password.utils';

class LoginDto {
  @IsEmail()
  readonly email!: Email;

  @IsString()
  @IsNotEmpty()
  readonly password!: Password;
}

export { LoginDto };
