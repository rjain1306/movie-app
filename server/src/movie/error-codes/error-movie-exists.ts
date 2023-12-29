import { MovieErrorCodes, MovieResourceNames } from './movie-error-codes';
import { LoggingDescriptor, BaseError } from '../../utils/errors/base-error';

export class ErrorMovieExists extends BaseError {
  constructor(title, error?: any) {
    const message = `Movie with Title: ${title} already exists.`;
    super(
      MovieErrorCodes.ErrMovieAlreadyExists,
      MovieResourceNames.MovieNameSingular,
      'Movie already exists for given title.',
      new LoggingDescriptor(message, error),
    );
  }
}
