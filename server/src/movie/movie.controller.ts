
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
  Get,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiBody,
  ApiBearerAuth,
  ApiConsumes,
} from '@nestjs/swagger';
import { BaseController } from '../core/base.controller';
import { MovieService } from './services/movie.service';
import {
  AddMovieModel,
  MovieDisplayModel,
} from './dto';
import { BaseError } from '../utils/errors/base-error';
import { GetReqUser } from '../utils/auth/decorators/getReqUser.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { BasicAuthGuard } from 'src/utils/auth/guards/basic-auth-guard';
import { AuthorizedUserGuard } from 'src/utils/auth/guards/authorized-user-guard';

@ApiTags('Movie')
@Controller('movies')
export class MovieController extends BaseController {
  /**
   * Initializes Object
   */

  constructor(private _movieService: MovieService) {
    super();
  }

  @ApiBearerAuth()
  @UseGuards(AuthorizedUserGuard)
  @ApiOperation({ summary: 'List Movie' })
  @Get()
  async getMovieList(
    @Param('skip') skip: number,
    @Param('take') take: number,
  ) {
    const query = {
      skip,
      take
    }
    return this.getResult(
      await this._movieService.getMovie(query),
    );
  }

  @ApiBearerAuth()
  @UseGuards(AuthorizedUserGuard)
  @ApiOperation({ summary: 'Get Movie by Id' })
  @Get('movie/:movieId')
  async getMovieById(
    @Param('movieId') movieId: string
  ) {
    return this.getResult(
      await this._movieService.getMovieById(movieId)
    );
  }

  @ApiBearerAuth()
  @UseGuards(AuthorizedUserGuard)
  @ApiOperation({ summary: 'Create Movie' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: MovieDisplayModel,
  })
  @HttpCode(201)
  @Post('movie')
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
  async createMovie(
    @Body() data: AddMovieModel,
    //eslint-disable-next-line no-undef 
    @UploadedFile() file: Express.Multer.File,
  ): Promise<MovieDisplayModel | BaseError> {
    return this.getResult(await this._movieService.createMovie(data, file));
  }

  @ApiBearerAuth()
  @UseGuards(BasicAuthGuard)
  @ApiOperation({ summary: 'Updates movie Image.' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: MovieDisplayModel,
  })
  @HttpCode(200)
  @Post('movie/:movieId/profile-pic')
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
  async updateMovieImage(
    @Param('movieId') movieId: string,
    // eslint-disable-next-line no-undef
    @UploadedFile() file: Express.Multer.File,
    @GetReqUser() user: ReqUserModel,
  ): Promise<MovieDisplayModel | BaseError> {
    return this.getResult(
      await this._movieService.updateMovieImage(movieId, file, user),
    );
  }

  @ApiBearerAuth()
  @UseGuards(BasicAuthGuard)
  @ApiOperation({ summary: 'Deletes movie for given Id.' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: BoolResult,
  })
  @HttpCode(200)
  @Delete('movie/:movieId')
  async deleteUser(
    @Param('movieId') movieId: string,
  ): Promise<BoolResult | BaseError> {
    return this.getResult(await this._movieService.deleteMovie(movieId));
  }

}
