/* eslint-disable require-await */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { BadRequestException, PipeTransform } from '@nestjs/common';

export class ParseMonthPipe implements PipeTransform {
  async transform(query: any) {
    if (isNaN(query)) {
      throw new BadRequestException(`Month: ${query} is invalid.`);
    }

    if (parseInt(query, 10) < 1 || parseInt(query, 10) > 12) {
      throw new BadRequestException(`Month: ${query} is invalid.`);
    }

    return query;
  }
}

export class ParseMonthPipeOptional implements PipeTransform {
  async transform(query: any) {
    if (!query) return query;

    if (isNaN(query)) {
      throw new BadRequestException(`Month: ${query} is invalid.`);
    }

    if (parseInt(query, 10) < 1 || parseInt(query, 10) > 12) {
      throw new BadRequestException(`Month: ${query} is invalid.`);
    }

    return query;
  }
}
