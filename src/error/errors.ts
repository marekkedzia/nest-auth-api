import ErrorMessage from './error.message';
import { HttpException } from '@nestjs/common';
import { IdUtils } from '../utils/id.utils';
import { Opaque } from 'ts-opaque';

type ErrorId = Opaque<string, 'error-id'>;

function buildMessage(message: ErrorMessage | string): string {
  return `${message} id: ${IdUtils.generateErrorId()}`;
}

class CustomForbiddenError extends HttpException {
  constructor() {
    super(buildMessage(ErrorMessage.FORBIDDEN), 403);
  }
}

class CustomUnauthorizedError extends HttpException {
  constructor() {
    super(buildMessage(ErrorMessage.UNAUTHORIZED), 401);
  }
}

export { CustomForbiddenError, ErrorId, CustomUnauthorizedError };
