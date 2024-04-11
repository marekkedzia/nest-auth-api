import { forwardRef, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { appConfig, variablesConfig } from '../../config';
import { AuthController } from './auth.controller';
import { UserModule } from '../user';
import AuthService from './auth.service';
import { JwtRequireUserCredentialsStrategy } from './strategies/require.user.credentials.strategy';

@Module({
  imports: [
    forwardRef(() => UserModule),
    PassportModule,
    JwtModule.register({
      secret: appConfig.JWT_SECRET,
      signOptions: { expiresIn: variablesConfig.jwt.tokenExpiration },
    }),
  ],
  controllers: [AuthController],
  providers: [JwtStrategy, JwtRequireUserCredentialsStrategy, AuthService],
  exports: [AuthModule],
})
export class AuthModule {}
