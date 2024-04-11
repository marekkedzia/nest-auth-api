import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { HashedPassword } from '../../../../utils/password.utils';
import { Email, UserId } from '../../schemas/user.types';

@Entity('User')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: UserId;

  @Column()
  email: Email;

  @Column()
  hashedPassword: HashedPassword;

  constructor(id: UserId, email: Email, hashedPassword: HashedPassword) {
    this.id = id;
    this.email = email;
    this.hashedPassword = hashedPassword;
  }
}

export default User;
