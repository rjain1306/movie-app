import { JsonPatchValidationPipe } from '../../core/pipes/json-patch-validation-pipe';
import { BadRequestException, PipeTransform } from '@nestjs/common';

import { UserEnum } from '../../core/enums/database-validation-enums';
import { WinstonLogger } from '../../utils/logger';
import { UserErrorCodes } from '../error-codes';

export class UserJsonPatchPipe implements PipeTransform {
  private logger: WinstonLogger = new WinstonLogger();

  readonly validPath = [
    UserEnum.FIRST_NAME,
    UserEnum.LAST_NAME,
    UserEnum.EMAIL_ADDRESS,
    UserEnum.PASSWORD,
    UserEnum.PHONE_NUMBER,
  ];

  readonly optionalField = [UserEnum.PHONE_NUMBER];

  readonly isEmail = [UserEnum.EMAIL_ADDRESS];

  readonly isPassword = [UserEnum.PASSWORD];


  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  public userJsonValidation(bodyData) {
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

      if (this.optionalField.includes(path)) {
        if (data.value === null || data.value === '') {
          data.value = null;
          return;
        }
      }

      if (this.isEmail.includes(path)) {
        JsonPatchValidationPipe.toValidateEmail(data.value, path);
      } else {
        JsonPatchValidationPipe.toValidateValue(
          data.value,
          path,
          this.optionalField.includes(path),
        );
      }
    });
    return bodyData;
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  async transform(bodyData: any) {
    this.logger.setScope(__filename);
    try {
      return await this.userJsonValidation(bodyData);
    } catch (e) {
      this.logger.error(
        `Error in executing patch for Application.\n Message: ${e.message}`,
        e.stack,
        UserErrorCodes.ErrUserUpdate,
      );
      throw new BadRequestException(e.response);
    }
  }
}
