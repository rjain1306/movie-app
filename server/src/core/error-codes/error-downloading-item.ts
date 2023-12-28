import { LoggingDescriptor } from './../../utils/errors/base-error';
import { BaseError } from '../../utils/errors/base-error';
export class ErrorDownloadingItem extends BaseError {
  constructor(
    itemName: string,
    errorCode: string,
    criteria?: string,
    error?: any,
  ) {
    const message = ` There was an error ${itemName} downloading file for criteria provided. Criteria: ${criteria}`;
    super(
      errorCode,
      itemName,
      ` There was an error ${itemName} downloading file for criteria provided.`,
      new LoggingDescriptor(message, error),
    );
  }
}
