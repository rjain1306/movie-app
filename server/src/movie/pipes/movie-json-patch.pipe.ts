import { JsonPatchValidationPipe } from '../../core/pipes/json-patch-validation-pipe';
import { BadRequestException, PipeTransform } from '@nestjs/common';

import { MovieEnum } from '../../core/enums/database-validation-enums';
import { WinstonLogger } from '../../utils/logger';
import { MovieErrorCodes } from '../error-codes';

export class MovieJsonPatchPipe implements PipeTransform {
  private logger: WinstonLogger = new WinstonLogger();

  readonly validPath = [
    MovieEnum.TITLE,
    MovieEnum.PUBLISH_YEAR
  ];

  readonly isString = [MovieEnum.TITLE, MovieEnum.PUBLISH_YEAR];


  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  public movieJsonValidation(bodyData) {
    if (!bodyData || !bodyData.length) {
      throw new BadRequestException(
        'Validation failed, Body should be an array of objects',
      );
    }
    bodyData.forEach((data: any) => {
      JsonPatchValidationPipe.toValidateKeys(data);
      const path = JsonPatchValidationPipe.toValidatePath(
        data.path,
        this.validPath,
      );
      JsonPatchValidationPipe.toValidateOp(data.op);

      // to do..

    });
    return bodyData;
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  async transform(bodyData: any) {
    this.logger.setScope(__filename);
    try {
      return await this.movieJsonValidation(bodyData);
    } catch (e) {
      this.logger.error(
        `Error in executing patch for Application.\n Message: ${e.message}`,
        e.stack,
        MovieErrorCodes.ErrMovieUpdate,
      );
      throw new BadRequestException(e.response);
    }
  }
}
