
import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Body,
  Res,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { BaseController } from '../../core/base.controller';
import { AuthService } from './services/auth.service';
import { BaseError } from '../../utils/errors/base-error';
import { GetReqUser } from '../../utils/auth/decorators/getReqUser.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { BasicAuthGuard } from '../../utils/auth/guards/basic-auth-guard';
import { AddUserModel, UserDisplayModel } from '../../users/dto';
import { loginModel } from './dto/loginModel';
import {Response} from 'express';

@ApiTags('Auth')
@Controller('auth')
export class AuthController extends BaseController {
  /**
   * Initializes Object
   */

  constructor(private _authService: AuthService) {
    super();
  }

  @ApiOperation({
    summary:
      'Sign up user',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: UserDisplayModel,
  })
  @HttpCode(201)
  @Post('signup')
  async registerUser(
    @Body() data: AddUserModel,
  ): Promise<UserDisplayModel | BaseError> {
    return this.getResult(await this._authService.registerUser(data));
  }

  @ApiOperation({
    summary:
      'Login User',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: Boolean,
  })
  @HttpCode(201)
  @Post('login')
  async loginUser(
    @Body() data: loginModel,
    @Res({passthrough: true}) response: Response
  ): Promise<Boolean | BaseError> {
    return this.getResult(await this._authService.loginUser(data, response));
  }


  @ApiOperation({
    summary:
      'Logout User',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: Object,
  })
  @HttpCode(201)
  @Post('logout')
  async logout(@Res({passthrough: true}) response: Response): Promise<Object> {
      response.clearCookie('jwt');

      return {
          message: 'success'
      }
  }

}
