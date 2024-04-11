import Opaque from 'ts-opaque';
import { UserId } from '../../user';

type JwtPayload = {
  userId: UserId;
  hasUserCredentials: boolean;
};

type JwtToken = Opaque<string, 'jwt-token'>;

export { JwtPayload, JwtToken };
