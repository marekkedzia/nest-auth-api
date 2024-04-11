import { Injectable } from '@nestjs/common';
import { LoginDto } from './schemas/login.dto';
import { PasswordUtils } from '../../utils/password.utils';
import { CustomForbiddenError } from '../../error/errors';
import User from '../user/store/entities/user.entity';
import UserOperationsFacade from '../user/user.operations.facade';
import { JwtToken } from './schemas/jwt.types';
import { JwtStrategy } from './strategies/jwt.strategy';
import { variablesConfig } from '../../config';

@Injectable()
class AuthService {
  constructor(
    private readonly userOperationsFacade: UserOperationsFacade,
    private readonly jwtStrategy: JwtStrategy,
  ) {}

  async login({
    email,
    password,
  }: LoginDto): Promise<{ token: JwtToken; expiresIn: string }> {
    const user: User = await this.userOperationsFacade.getUserByEmail(email);

    const isValidPassword: boolean = await PasswordUtils.comparePassword(
      password,
      user.hashedPassword,
    );

    if (!isValidPassword) {
      throw new CustomForbiddenError();
    }

    const hasUserCredentials: boolean =
      await this.userOperationsFacade.hasUserCredentials(user.id);

    const token: JwtToken = this.jwtStrategy.generateJWT({
      userId: user.id,
      hasUserCredentials,
    });
    return { token, expiresIn: variablesConfig.jwt.tokenExpiration };
  }
}

export default AuthService;
