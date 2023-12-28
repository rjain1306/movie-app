import { BadRequestException } from '@nestjs/common';
import { BaseError } from './../utils/errors/base-error';
import { BoolResult } from './dto/bool-result-dto';

export class BaseController {
  public getResult(response: any): any {
    if (response instanceof BaseError) {
      throw new BadRequestException(response);
    }
    if (typeof response === 'boolean') {
      return new BoolResult(response as boolean);
    }
    return response;
  }
}
