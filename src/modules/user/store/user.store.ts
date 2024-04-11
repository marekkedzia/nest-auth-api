import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserCredentials } from './entities/user.credentials.entity';
import User from './entities/user.entity';
import { Email, UserId } from '../schemas/user.types';

@Injectable()
class UserStore {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(UserCredentials)
    private userCredentialsRepository: Repository<UserCredentials>,
  ) {}

  async createUser(user: User): Promise<void> {
    await this.userRepository.save(user);
  }

  async getUserCredentialsByUserId(
    userId: UserId,
  ): Promise<UserCredentials | null> {
    return this.userCredentialsRepository.findOne({ where: { userId } });
  }

  async createUserCredentials(userCredentials: UserCredentials): Promise<void> {
    await this.userCredentialsRepository.save(userCredentials);
  }

  async getUserCredentialsList(): Promise<UserCredentials[]> {
    return this.userCredentialsRepository.find();
  }

  async getUserByEmail(email: Email): Promise<User | null> {
    return this.userRepository.findOne({ where: { email } });
  }
}

export default UserStore;
