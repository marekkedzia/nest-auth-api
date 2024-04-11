import { IsEmail, IsString, Length } from 'class-validator';
import { Email } from './user.types';
import { variablesConfig } from '../../../config';
import { Password } from '../../../utils/password.utils';

export class CreateUserDto {
  @IsEmail()
  readonly email!: Email;

  @IsString()
  @Length(variablesConfig.user.minPasswordLength)
  readonly password!: Password;
}
