import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload, JwtToken } from '../schemas/jwt.types';
import { createOpaque } from '../../../utils/create.opaque';
import { appConfig, variablesConfig } from '../../../config';

@Injectable()
export class JwtStrategy extends PassportStrategy(
  Strategy,
  variablesConfig.jwt.strategies.basic,
) {
  constructor(private readonly jwtService: JwtService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: appConfig.JWT_SECRET,
    });
  }

  generateJWT({ userId, hasUserCredentials }: JwtPayload): JwtToken {
    return createOpaque<string, JwtToken>(
      this.jwtService.sign({ userId, hasUserCredentials }),
    );
  }

  async validate({
    userId,
    hasUserCredentials,
  }: JwtPayload): Promise<JwtPayload> {
    return { userId, hasUserCredentials };
  }
}
