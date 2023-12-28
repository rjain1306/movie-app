import { BaseError } from '../../utils/errors/base-error';
import { AddUserModel } from '../dto';

export class AddUserValidator {
  public static Validate(model: AddUserModel): BaseError | boolean {
    // validation.

    return true;
  }
}
