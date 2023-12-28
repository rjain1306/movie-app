
import {
  BoolResult,
  ReqUserModel,
} from '../core/dto';
import {
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Body,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  Delete,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiBasicAuth,
  ApiResponse,
  ApiTags,
  ApiBody,
  ApiBearerAuth,
  ApiConsumes,
} from '@nestjs/swagger';
import { BaseController } from '../core/base.controller';
import { UsersService } from './services/users.service';
import {
  AddUserModel,
  UserDisplayModel,
} from './dto';
import { BaseError } from '../utils/errors/base-error';
import { GetReqUser } from '../utils/auth/decorators/getReqUser.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { BasicAuthGuard } from 'src/utils/auth/guards/basic-auth-guard';

@ApiTags('Users')
@Controller('users')
export class UsersController extends BaseController {
  /**
   * Initializes Object
   */

  constructor(private _usersService: UsersService) {
    super();
  }

  

  @ApiBasicAuth()
  @UseGuards(BasicAuthGuard)
  @ApiOperation({
    summary:
      'Create user',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: UserDisplayModel,
  })
  @HttpCode(201)
  @Post('users')
  async createUser(
    @Body() data: AddUserModel,
  ): Promise<UserDisplayModel | BaseError> {
    return this.getResult(await this._usersService.createUser(data));
  }

  @ApiBearerAuth()
  @UseGuards(BasicAuthGuard)
  @ApiOperation({ summary: 'Updates user profile picture.' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: UserDisplayModel,
  })
  @HttpCode(200)
  @Post('users/:userId/profile-pic')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  async updateUserProfilePic(
    @Param('userId') userId: string,
    // eslint-disable-next-line no-undef
    @UploadedFile() file: Express.Multer.File,
    @GetReqUser() user: ReqUserModel,
  ): Promise<UserDisplayModel | BaseError> {
    return this.getResult(
      await this._usersService.updateUserProfilePic(userId, file, user),
    );
  }

  @ApiBearerAuth()
  @UseGuards(BasicAuthGuard)
  @ApiOperation({ summary: 'Deletes User for given Id.' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: BoolResult,
  })
  @HttpCode(200)
  @Delete('users/:userId')
  async deleteUser(
    @Param('userId') userId: string,
  ): Promise<BoolResult | BaseError> {
    return this.getResult(await this._usersService.deleteUser(userId));
  }

}
