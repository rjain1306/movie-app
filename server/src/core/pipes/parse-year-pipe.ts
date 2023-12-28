/* eslint-disable require-await */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { BadRequestException, PipeTransform } from '@nestjs/common';

export class ParseYearPipe implements PipeTransform {
  async transform(query) {
    const currentYear = new Date().getFullYear();

    if (isNaN(query)) {
      throw new BadRequestException(`Year: ${query} is invalid.`);
    }

    if (parseInt(query, 10) < 1900 || parseInt(query, 10) > currentYear) {
      throw new BadRequestException(`Year: ${query} ,should not be in future.`);
    }

    return query;
  }
}

export class ParseYearPipeOptional implements PipeTransform {
  async transform(query) {
    if (!query) return query;

    const currentYear = new Date().getFullYear();

    if (isNaN(query)) {
      throw new BadRequestException(`Year: ${query} is invalid.`);
    }

    if (parseInt(query, 10) < 1900 || parseInt(query, 10) > currentYear) {
      throw new BadRequestException(`Year: ${query} ,should not be in future.`);
    }

    return query;
  }
}
