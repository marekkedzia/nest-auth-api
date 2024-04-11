import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../auth.controller';
import AuthService from '../auth.service';
import { testLoginDto, testJwtToken } from './test.data';
import { mockJwtStrategy } from './mocks';
import UserOperationsFacade from '../../user/user.operations.facade';
import { JwtStrategy } from '../strategies/jwt.strategy';
import { PasswordUtils } from '../../../utils/password.utils';
import { CustomForbiddenError } from '../../../error/errors';
import { mockUserOperationsFacade } from '../../user/tests/mocks';
import { variablesConfig } from '../../../config';

describe('AuthController', () => {
  let authController: AuthController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        AuthService,
        {
          provide: UserOperationsFacade,
          useValue: mockUserOperationsFacade,
        },
        {
          provide: JwtStrategy,
          useValue: mockJwtStrategy,
        },
      ],
    }).compile();

    authController = app.get<AuthController>(AuthController);
  });

  describe('root', () => {
    it('should return jwt token', async () => {
      jest.spyOn(PasswordUtils, 'comparePassword').mockResolvedValue(true);
      expect(await authController.login(testLoginDto)).toStrictEqual({
        token: testJwtToken,
        expiresIn: variablesConfig.jwt.tokenExpiration,
      });
    });

    it('shouldnt return jwt token so password doesnt match', async () => {
      jest.spyOn(PasswordUtils, 'comparePassword').mockResolvedValue(false);
      await expect(authController.login(testLoginDto)).rejects.toThrow(
        CustomForbiddenError,
      );
    });
  });
});
