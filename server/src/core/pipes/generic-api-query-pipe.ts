import { BadRequestException, PipeTransform } from '@nestjs/common';

export class GenericApiQueryPipe implements PipeTransform {
  constructor(
    private genericEnumTypes: any,
    private paramName: string,
    private isQuery: boolean,
    private required: boolean,
  ) {}

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  public validationForEnums(value) {
    const allValuesOfEnum = [];

    const element = this.genericEnumTypes;
    // Pushing all values of Enum to array.
    Object.keys(element).map((i: any) => allValuesOfEnum.push(element[i]));

    if (this.isQuery) {
      const data = value[this.paramName];
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
    } else {
      if (this.required && !value) {
        throw new BadRequestException(
          `Please provide valid value for "${this.paramName}" parameter.`,
        );
      }

      if (value && !allValuesOfEnum.includes(value)) {
        throw new BadRequestException(
          `Please provide valid value for "${this.paramName}" parameter.`,
        );
      }
    }

    return value;
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type, require-await
  async transform(value: string) {
    try {
      return this.validationForEnums(value);
    } catch (e) {
      throw new BadRequestException(e.response);
    }
  }
}
