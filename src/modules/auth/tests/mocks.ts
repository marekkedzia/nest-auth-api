import { testJwtToken } from './test.data';

const mockJwtStrategy = {
  generateJWT: jest.fn(() => testJwtToken),
};

export { mockJwtStrategy };
