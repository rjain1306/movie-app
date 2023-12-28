import { ErrorInvalidUserToken } from './error-invalid-user-token';
import { ErrorUnauthorizedUser } from './error-unauthorized-user';

const ErrorCode = {
  ErrorUnauthorizedUser: 'ERR_UNAUTHORIZED_USER',
  ErrorInvalidUserToken: 'ERR_INVALID_USER_TOKEN',
};

export { ErrorCode, ErrorUnauthorizedUser, ErrorInvalidUserToken };
