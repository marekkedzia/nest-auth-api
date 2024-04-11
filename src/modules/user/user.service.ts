import { Injectable } from '@nestjs/common';
import UserStore from './store/user.store';
import { UserId } from './schemas/user.types';
import { IdUtils } from '../../utils/id.utils';
import { CreateUserDto } from './schemas/create.user.dto';
import { PasswordUtils } from '../../utils/password.utils';
import User from './store/entities/user.entity';
import { UserCredentials } from './store/entities/user.credentials.entity';
import { CustomForbiddenError } from '../../error/errors';
import UserOperationsFacade from './user.operations.facade';
import { CreateUserCredentialsDto } from './schemas/user.credentials.dto';

@Injectable()
class UserService {
  constructor(
    private userStore: UserStore,
    private userOperationsFacade: UserOperationsFacade,
  ) {}

  async registerUser({ email, password }: CreateUserDto): Promise<UserId> {
    const userExists: User | null = await this.userStore.getUserByEmail(email);
    if (userExists) {
      throw new CustomForbiddenError();
    }

    const user: User = {
      id: IdUtils.generateUserId(),
      email,
      hashedPassword: await PasswordUtils.hashPassword(password),
    };

    await this.userStore.createUser(user);
    return user.id;
  }

  async createUserCredentials(
    userCredentialsDto: CreateUserCredentialsDto,
    userId: UserId,
  ): Promise<void> {
    const hasUserCredentials: boolean =
      await this.userOperationsFacade.hasUserCredentials(userId);
    if (hasUserCredentials) {
      throw new CustomForbiddenError();
    }

    const userCredentials: UserCredentials = {
      id: IdUtils.generateUserCredentialsId(),
      userId,
      ...userCredentialsDto,
    };
    await this.userStore.createUserCredentials(userCredentials);
  }

  async getUserCredentialsList(): Promise<UserCredentials[]> {
    return this.userStore.getUserCredentialsList();
  }
}

export default UserService;
