import { Test, TestingModule } from '@nestjs/testing';
import UserController from '../user.controller';
import UserService from '../user.service';
import {
  testCreateUserCredentialsDto,
  testCreateUserDto,
  testUserCredentialsList,
} from './test.data';
import { IdUtils } from '../../../utils/id.utils';
import UserOperationsFacade from '../user.operations.facade';
import { mockUserOperationsFacade, mockUserStore } from './mocks';
import { testUserId } from '../../auth/tests/test.data';
import UserStore from '../store/user.store';
import { CustomForbiddenError } from '../../../error/errors';

describe('UserController', () => {
  let userController: UserController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        UserService,
        {
          provide: UserOperationsFacade,
          useValue: mockUserOperationsFacade,
        },
        {
          provide: UserStore,
          useValue: mockUserStore,
        },
      ],
    }).compile();

    userController = app.get<UserController>(UserController);
  });

  describe('root', () => {
    it('should register user', async () => {
      jest.spyOn(IdUtils, 'generateUserId').mockReturnValue(testUserId);
      expect(await userController.registerUser(testCreateUserDto)).toBe(
        testUserId,
      );
    });

    it('shouldnt register user so email is occupied', async () => {
      jest
        .spyOn(mockUserStore, 'getUserByEmail')
        .mockResolvedValue(Promise.resolve({}));
      await expect(
        userController.registerUser(testCreateUserDto),
      ).rejects.toThrow(CustomForbiddenError);
    });

    it('should create user credentials', async () => {
      jest
        .spyOn(mockUserOperationsFacade, 'hasUserCredentials')
        .mockResolvedValue(Promise.resolve(false));
      await expect(
        userController.createUserCredentials(
          { user: { userId: testUserId, hasUserCredentials: false } },
          testCreateUserCredentialsDto,
        ),
      ).resolves.toBeUndefined();
    });

    it('shouldnt create user credentials so user has already one', async () => {
      jest
        .spyOn(mockUserOperationsFacade, 'hasUserCredentials')
        .mockResolvedValue(Promise.resolve(true));
      await expect(
        userController.createUserCredentials(
          { user: { userId: testUserId, hasUserCredentials: false } },
          testCreateUserCredentialsDto,
        ),
      ).rejects.toThrow(CustomForbiddenError);
    });

    it('should get user credentials list', async () => {
      expect(await userController.getUserCredentialsList()).toEqual(
        testUserCredentialsList,
      );
    });
  });
});
