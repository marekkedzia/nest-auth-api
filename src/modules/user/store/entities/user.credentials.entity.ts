import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import {
  FirstName,
  LastName,
  PhoneNumber,
  PreferredTechnology,
  ShirtSize,
  UserCredentialsId,
  UserId,
} from '../../schemas/user.types';

@Entity('UserCredentials')
export class UserCredentials {
  @PrimaryGeneratedColumn('uuid')
  id: UserCredentialsId;

  @Column()
  userId: UserId;

  @Column()
  firstName: FirstName;

  @Column()
  lastName: LastName;

  @Column()
  phoneNumber: PhoneNumber;

  @Column()
  shirtSize: ShirtSize;

  @Column()
  preferredTechnology: PreferredTechnology;

  constructor(
    id: UserCredentialsId,
    userId: UserId,
    firstName: FirstName,
    lastName: LastName,
    phoneNumber: PhoneNumber,
    shirtSize: ShirtSize,
    preferredTechnology: PreferredTechnology,
  ) {
    this.id = id;
    this.userId = userId;
    this.firstName = firstName;
    this.lastName = lastName;
    this.phoneNumber = phoneNumber;
    this.shirtSize = shirtSize;
    this.preferredTechnology = preferredTechnology;
  }
}
