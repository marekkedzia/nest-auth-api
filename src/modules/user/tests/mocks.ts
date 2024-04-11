import { Email } from '../schemas/user.types';
import { testHashedPassword, testUserId } from '../../auth/tests/test.data';
import User from '../store/entities/user.entity';
import { testUserCredentialsList } from './test.data';

const mockUserOperationsFacade = {
  getUserByEmail: jest.fn((email: Email) => {
    return Promise.resolve({
      id: testUserId,
      email,
      hashedPassword: testHashedPassword,
    } as User);
  }),
  hasUserCredentials: jest.fn(() => Promise.resolve(true)),
};

const mockUserStore = {
  createUser: jest.fn(),
  createUserCredentials: jest.fn(),
  getUserCredentialsList: jest.fn(() => testUserCredentialsList),
  getUserByEmail: jest.fn((): any => Promise.resolve(null)),
};

export { mockUserOperationsFacade, mockUserStore };
