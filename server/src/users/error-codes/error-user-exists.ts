import { UserErrorCodes, UserResourceNames } from './user-error-codes';
import { LoggingDescriptor, BaseError } from '../../utils/errors/base-error';

export class ErrorUserExists extends BaseError {
  constructor(email, error?: any) {
    const message = `User with email: ${email} already exists.`;
    super(
      UserErrorCodes.ErrUserAlreadyExists,
      UserResourceNames.UserNameSingular,
      'User already exists for given email.',
      new LoggingDescriptor(message, error),
    );
  }
}
