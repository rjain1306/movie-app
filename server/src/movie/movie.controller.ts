
import {
  ApiWrappedCollectionResponse,
  BoolResult,
  ListApiQueryDto,
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
  Query,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiBody,
  ApiBearerAuth,
  ApiConsumes,
  ApiQuery,
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
import { BasicAuthGuard } from '../utils/auth/guards/basic-auth-guard';
import { AuthorizedUserGuard } from '../utils/auth/guards/authorized-user-guard';
import { PaginationSearchTerm, PaginationSkip, PaginationTake } from '../utils/constants/api-query-constant';
import { ListApiQueryPipe } from '../core/pipes';

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
  @ApiWrappedCollectionResponse(MovieDisplayModel)
  @ApiQuery(PaginationSkip)
  @ApiQuery(PaginationTake)
  @HttpCode(200)
  @Get()
  async getMovieList(
    @Query(ListApiQueryPipe) query: ListApiQueryDto,
  ) {
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
  @UseGuards(AuthorizedUserGuard)
  @ApiOperation({ summary: 'update Movie' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: MovieDisplayModel,
  })
  @HttpCode(201)
  @Post('movie/:movieId')
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
  async updateMovie(
    @Body() data: AddMovieModel,
    @Param('movieId') movieId: string,
    //eslint-disable-next-line no-undef 
    @UploadedFile() file: Express.Multer.File,
  ): Promise<MovieDisplayModel | BaseError> {
    return this.getResult(await this._movieService.updateMovie(movieId, data, file));
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
  async deleteMovie(
    @Param('movieId') movieId: string,
  ): Promise<BoolResult | BaseError> {
    return this.getResult(await this._movieService.deleteMovie(movieId));
  }

}
