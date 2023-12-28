import { LoggingDescriptor, BaseError } from '../../utils/errors/base-error';
export class ErrorValidation extends BaseError {
  constructor(
    itemName: string,
    message: string,
    logMessage?: string,
    error?: any,
  ) {
    super(
      'ERR_VALIDATION',
      itemName,
      message,
      new LoggingDescriptor(logMessage, error),
    );
  }
}
