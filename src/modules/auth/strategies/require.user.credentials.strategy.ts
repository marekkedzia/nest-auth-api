import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { appConfig, variablesConfig } from '../../../config';
import { JwtPayload } from '../schemas/jwt.types';
import { CustomUnauthorizedError } from '../../../error/errors';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtRequireUserCredentialsStrategy extends PassportStrategy(
  Strategy,
  variablesConfig.jwt.strategies.jwtRequireUserCredentials,
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: appConfig.JWT_SECRET,
    });
  }

  async validate({
    userId,
    hasUserCredentials,
  }: JwtPayload): Promise<JwtPayload> {
    if (!hasUserCredentials) {
      throw new CustomUnauthorizedError();
    }
    return { userId, hasUserCredentials };
  }
}
