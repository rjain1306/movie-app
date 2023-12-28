import { BaseError } from './../../errors/base-error';
import { ErrorCode } from './index';

export class ErrorUnauthorizedUser extends BaseError {
  constructor(error?: any) {
    const message = 'Unauthorized: Access is denied';
    super(ErrorCode.ErrorUnauthorizedUser, 'Unauthorized', message, error); 
  }
}
