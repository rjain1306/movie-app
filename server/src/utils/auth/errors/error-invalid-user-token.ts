import { BaseError } from './../../errors/base-error';
import { ErrorCode } from './index';

export class ErrorInvalidUserToken extends BaseError {
  constructor(error?: any) {
    const message = 'Unauthorized: Invalid User Token';
    super(ErrorCode.ErrorInvalidUserToken, 'Unauthorized', message, error);
  }
}
