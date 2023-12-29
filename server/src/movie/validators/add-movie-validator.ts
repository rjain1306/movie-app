import { BaseError } from '../../utils/errors/base-error';
import { AddMovieModel } from '../dto';

export class AddMovieValidator {
  public static Validate(model: AddMovieModel): BaseError | boolean {
    // validation.

    return true;
  }
}
