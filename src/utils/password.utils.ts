import * as bcrypt from 'bcrypt';
import { variablesConfig } from '../config';
import { Opaque } from 'ts-opaque';
import { createOpaque } from './create.opaque';

type Password = Opaque<string, 'password'>;
type HashedPassword = Opaque<string, 'hashed-password'>;

class PasswordUtils {
  public static async hashPassword(
    password: Password,
  ): Promise<HashedPassword> {
    const hashedPassword: string = await bcrypt.hash(
      password,
      variablesConfig.password.bcryptSaltRounds,
    );
    return createOpaque<string, HashedPassword>(hashedPassword);
  }

  public static async comparePassword(
    password: Password,
    hash: HashedPassword,
  ): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}

export { PasswordUtils, Password, HashedPassword };
