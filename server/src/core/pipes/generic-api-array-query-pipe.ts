import { BadRequestException, PipeTransform } from '@nestjs/common';

export class GenericApiArrayQueryPipe implements PipeTransform {
  constructor(
    private genericEnumTypes: any,
    private paramName: string,
    private required: boolean,
  ) {}

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  public validationForEnums(values: any) {
    const allValuesOfEnum = [];
    const enumTypes = this.genericEnumTypes;

    const data = values[this.paramName];

    // Pushing all values of Enum to array.
    Object.keys(enumTypes).map((i: any) => allValuesOfEnum.push(enumTypes[i]));
    if (Array.isArray(data)) {
      if (this.required && !data && data.length === 0) {
        throw new BadRequestException(
          `Please provide valid value for "${this.paramName}" parameter.`,
        );
      }

      for (let index = 0; index < data.length; index += 1) {
        const element = data[index];
        if (data && data.length !== 0 && !allValuesOfEnum.includes(element)) {
          throw new BadRequestException(
            `Please provide valid value for "${this.paramName}" parameter.`,
          );
        }
      }
    } else {
      if (this.required && !data) {
        throw new BadRequestException(
          `Please provide valid value for "${this.paramName}" parameter.`,
        );
      }

      if (data && !allValuesOfEnum.includes(data)) {
        throw new BadRequestException(
          `Please provide valid value for "${this.paramName}" parameter.`,
        );
      }
    }

    return values;
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type, require-await
  async transform(values: any) {
    try {
      return this.validationForEnums(values);
    } catch (e) {
      throw new BadRequestException(e.response);
    }
  }
}
