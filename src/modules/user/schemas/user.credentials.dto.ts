import { IsIn, IsString, Length } from 'class-validator';
import { variablesConfig } from '../../../config';
import {
  FirstName,
  LastName,
  PhoneNumber,
  PreferredTechnology,
  ShirtSize,
} from './user.types';

export class CreateUserCredentialsDto {
  @IsString()
  @Length(1, variablesConfig.user.maxStringFieldLength)
  readonly firstName!: FirstName;

  @IsString()
  @Length(1, variablesConfig.user.maxStringFieldLength)
  readonly lastName!: LastName;

  @IsString()
  @Length(variablesConfig.user.phoneLength, variablesConfig.user.phoneLength)
  readonly phoneNumber!: PhoneNumber;

  @IsString()
  @IsIn(Object.values(variablesConfig.shirtSizes))
  readonly shirtSize!: ShirtSize;

  @IsString()
  @Length(1, variablesConfig.user.maxStringFieldLength)
  readonly preferredTechnology!: PreferredTechnology;
}
