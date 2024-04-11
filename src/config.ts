import * as shirtData from './resource.i18n/shirt.size.json';
import * as process from 'process';
import * as dotenv from 'dotenv';
dotenv.config();

function required(key: string, variable?: string) {
  if (!variable) throw new Error(`Required property is missing: ${key}`);
  return variable;
}

export const variablesConfig = {
  helloMessage: 'Hello there',
  user: {
    phoneLength: 9,
    maxStringFieldLength: 255,
    minPasswordLength: 14,
  },
  password: {
    bcryptSaltRounds: 10,
  },
  jwt: {
    tokenExpiration: '1h',
    strategies: {
      basic: 'jwt',
      jwtRequireUserCredentials: 'jwt-require-user-credentials',
    },
  },
  shirtSizes: shirtData.shirtSizes,
};

export const appConfig = {
  JWT_SECRET: required('JWT_SECRET', process.env.JWT_SECRET),
  SYNC_DB: required('SYNC_DB', process.env.SYNC_DB) === 'true',
};
