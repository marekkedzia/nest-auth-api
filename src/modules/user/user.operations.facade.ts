import { Injectable } from '@nestjs/common';
import UserStore from './store/user.store';
import User from './store/entities/user.entity';
import { Email, UserId } from './schemas/user.types';
import { CustomForbiddenError } from '../../error/errors';

@Injectable()
class UserOperationsFacade {
  constructor(private userStore: UserStore) {}

  public async getUserByEmail(email: Email): Promise<User> {
    const user: User | null = await this.userStore.getUserByEmail(email);
    if (!user) {
      throw new CustomForbiddenError();
    }
    return user;
  }

  public async hasUserCredentials(userId: UserId): Promise<boolean> {
    return this.userStore
      .getUserCredentialsByUserId(userId)
      .then((userCredentials) => !!userCredentials);
  }
}

export default UserOperationsFacade;
