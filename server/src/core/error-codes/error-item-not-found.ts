import { LoggingDescriptor } from './../../utils/errors/base-error';
import { BaseError } from '../../utils/errors/base-error';
export class ErrorItemNotFound extends BaseError {
  constructor(
    itemName: string,
    errorCode: string,
    criteria?: string,
    error?: any,
  ) {
    const message = `${itemName} not found for the criteria provided. Criteria: ${criteria}`;
    super(
      errorCode,
      itemName,
      `${itemName} not found for the criteria provided.`,
      new LoggingDescriptor(message, error),
    );
  }
}
