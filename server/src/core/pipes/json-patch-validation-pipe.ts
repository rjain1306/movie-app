import { BadRequestException } from '@nestjs/common';
import { validate as uuidValidate } from 'uuid';
import {
  isBoolean,
  isDateString,
  isEmail,
  isNumber,
  isString,
  maxLength,
} from 'class-validator';

export const isValidStatus = (value: any, validData): boolean => {
  const index = validData.includes(value);
  return index ? value : false;
};

const IsNotEmpty = (value: any, type: any, path?: any): any => {
  if (!value) {
    if (path) {
      throw new BadRequestException(
        `Validation failed, ${type} of ${path} should not be empty`,
      );
    }
    throw new BadRequestException(
      `Validation failed, ${type} must not be empty`,
    );
  }
};

export const isValidPathStatus = (status: any, validPath): any => {
  const allStatus = status.split('/');
  return validPath.includes(allStatus[1]);
};

const isValidUUId = (value: string[], path): any => {
  const inValidId = value.filter((id: any) => !uuidValidate(id));
  if (inValidId && inValidId.length) {
    throw new BadRequestException(
      `Validation failed (uuid  is expected) for ${path} : ${inValidId.map(
        (id: any) => `"${id}"`,
      )}  `,
    );
  }
};
export class JsonPatchValidationPipe {
  public static toValidateKeys(value): any {
    const validKeys = ['value', 'path', 'op'];
    const keys = Object.keys(value);
    if (validKeys.length !== keys.length) {
      throw new BadRequestException(
        `Valid keys '${validKeys.join(', ')}' are required`,
      );
    }
    const isValidKey = keys.every((key: any) => isValidStatus(key, validKeys));
    if (!isValidKey) {
      const notFound = keys
        .filter((queryKey: any) => !isValidStatus(queryKey, validKeys))
        .join(', ');
      throw new BadRequestException(
        `Validation failed, Invalid Key : ${notFound}`,
      );
    }
  }

  public static toValidatePath(path, validPath): any {
    IsNotEmpty(path, 'path');
    if (!isValidPathStatus(path, validPath)) {
      throw new BadRequestException(
        `Validation failed, Invalid path : ${path}`,
      );
    }
    return path.split('/')[1];
  }

  public static toValidateOp(value, validOperation?: string[]): any {
    IsNotEmpty(value, 'op');
    const validOp = validOperation
      ? validOperation
      : ['replace', 'add', 'remove'];
    if (!isValidStatus(value, validOp)) {
      throw new BadRequestException(
        `Validation failed, Invalid value for op : ${value} must be ${validOp.toString()} `,
      );
    }
  }

  public static toValidateValue(
    value,
    path?,
    skipCheckEmpty: boolean = false,
    skipLengthValidation: boolean = false,
  ): any {
    const maxCharacters = 255;
    if (!skipCheckEmpty) {
      IsNotEmpty(value, 'value', path);
    }
    if (!isString(value)) {
      throw new BadRequestException(
        `Validation failed, ${path} : '${value}' must be a string`,
      );
    }
    if (!maxLength(value, maxCharacters) && !skipLengthValidation) {
      throw new BadRequestException(
        `Validation failed, ${path} : '${value}' must be less than or equal to ${maxCharacters} characters`,
      );
    }
  }

  public static toValidateNumber(value, path?): any {
    IsNotEmpty(value, 'value', path);
    if (!isNumber(value)) {
      throw new BadRequestException(
        `Validation failed, ${path} : '${value}' should be a number`,
      );
    }
  }

  public static toValidateDateString(value, path?): any {
    IsNotEmpty(value, 'value', path);
    if (!isDateString(value)) {
      throw new BadRequestException(
        `Validation failed, ${path}: ${value} must be a valid ISOString`,
      );
    }
  }

  public static toValidateId(isUUID, path?): any {
    IsNotEmpty(isUUID, 'value', path);
    if (!uuidValidate(isUUID)) {
      throw new BadRequestException(
        `Validation failed (uuid  is expected) for ${path} : '${isUUID}'`,
      );
    }
  }

  public static toValidateEmail(value, path): any {
    if (!isEmail(value)) {
      throw new BadRequestException(
        `Validation failed, ${path} : '${value}' must be a valid email address.`,
      );
    }
  }

  public static toValidateBoolean(value, path): any {
    if (!isBoolean(value)) {
      throw new BadRequestException(
        `Validation failed, ${path} : '${value}' must be a boolean value.`,
      );
    }
  }

  public static toValidateArrayIds(value, path): any {
    if (!Array.isArray(value)) {
      throw new BadRequestException(
        `Validation failed, ${path} : '${value}' must be an array of uuids`,
      );
    }
    if (!value.length) {
      throw new BadRequestException(
        `Validation failed, ${path} array should not be empty`,
      );
    }
    isValidUUId(value, path);
  }

  public static toValidateArray(value, path): any {
    if (!Array.isArray(value)) {
      throw new BadRequestException(
        `Validation failed, ${path} : '${value}' must be an array`,
      );
    }
    if (!value.length) {
      throw new BadRequestException(
        `Validation failed, ${path} array should not be empty`,
      );
    }
  }

  public static toValidateObject(value, path): any {
    if (!value) {
      throw new BadRequestException(
        `Validation failed, ${path} object should not be empty.`,
      );
    }

    if (typeof value !== 'object') {
      throw new BadRequestException(
        `Validation failed, ${path} : '${value}' must be an object.`,
      );
    }
  }

}
