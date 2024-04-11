import { v4 as uuidv4 } from 'uuid';
import { UserId } from '../modules/user';
import { UserCredentialsId } from '../modules/user/schemas/user.types';
import { createOpaque } from './create.opaque';
import { ErrorId } from '../error/errors';

class IdUtils {
  private static generateId = (idPrefix: IdPrefix): string =>
    `${idPrefix}${uuidv4()}`;
  public static generateUserId = (): UserId =>
    createOpaque<string, UserId>(IdUtils.generateId(IdPrefix.USER));
  public static generateUserCredentialsId = (): UserCredentialsId =>
    createOpaque<string, UserCredentialsId>(
      IdUtils.generateId(IdPrefix.USER_CREDENTIALS),
    );
  public static generateErrorId = (): ErrorId =>
    createOpaque<string, ErrorId>(IdUtils.generateId(IdPrefix.ERROR));
}

enum IdPrefix {
  USER = 'U_',
  USER_CREDENTIALS = 'UC_',
  ERROR = 'ERR_',
}

export { IdUtils };
