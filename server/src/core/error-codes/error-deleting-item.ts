import { LoggingDescriptor, BaseError } from '../../utils/errors/base-error';
export class ErrorDeletingItem extends BaseError {
  constructor(
    itemName: string,
    errorCode: string,
    criteria?: string,
    error?: any,
  ) {
    const message = `There was an error deleting the ${itemName}${
      criteria ? ` with the criteria provided. Criteria: ${criteria}.` : '.'
    }`;
    super(
      errorCode,
      itemName,
      `There was an error deleting the ${itemName} for the criteria provided.`,
      new LoggingDescriptor(message, error),
    );
  }
}
