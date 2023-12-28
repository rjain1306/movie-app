import { UsersService } from './../../users/services/users.service';
import {
  Controller,
} from '@nestjs/common';
import {
  ApiTags,
} from '@nestjs/swagger';
import { BaseController } from '../base.controller';

@ApiTags('SeedData')
@Controller('type-data')
export class SeedDataController extends BaseController {
  /**
   * Initializes Object
   */

  constructor(
    private readonly _userService: UsersService,
  ) {
    super();
  }

}
