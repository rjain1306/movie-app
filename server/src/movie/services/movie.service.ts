

import { MovieBuilder } from './builders/movie.builder';
import { Inject, Injectable } from '@nestjs/common';
import 'reflect-metadata';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { WinstonLogger } from '../../utils/logger';
import { Movie } from '../models';
import {
  ErrorMovieExists,
  MovieResourceNames,
  MovieErrorCodes,
} from '../error-codes';
import {
  MovieRepository,
  IMovieRepository,
} from '../repository';
import { BaseError } from '../../utils/errors/base-error';
import {
  ErrorItemNotFound,
  ErrorCreatingItem,
  ErrorDeletingItem,
  ErrorUpdatingItem
} from '../../core/error-codes';

import {
  AddMovieModel,
  MovieDisplayModel,
} from '../dto';
import {
  ReqUserModel,
} from '../../core/dto';
import { AwsFilesService } from '../../utils/aws/s3/aws-file.service';
import { v4 as uuid } from 'uuid';
import { AddMovieValidator } from '../validators/add-movie-validator';
import * as bcrypt from 'bcrypt';

@Injectable()
export class MovieService {
  constructor(
    @InjectMapper()
    private mapper: Mapper,
    private _logger: WinstonLogger,

    @Inject(MovieRepository)
    private readonly _movieRepository: IMovieRepository,

    private readonly _awsFileService: AwsFilesService,

  ) {}


  /**
   * Create movie
   */
  async createMovie(
    model: AddMovieModel,
    file: any,
  ): Promise<MovieDisplayModel | BaseError> { 
    try {
      this._logger.info(
        `Executing add Movie with Payload: ${JSON.stringify(model)}.`,
      );

      const validateOutcome = AddMovieValidator.Validate(model);

      if (validateOutcome instanceof BaseError) {
        return validateOutcome;
      }

      const movieExists = await this._movieRepository.getByTitle(
        model.title, 
      );

      if (movieExists !== null) {
        return new ErrorMovieExists(model.title);
      }

      const movie = MovieBuilder.Build(model);

      // aws s3 --> image put operation.
      if (!file) {
        // return error
      } else {
        const fileExtension = file.originalname.substring(
          file.originalname.lastIndexOf('.'),
        );

        const uploadResult = await this._awsFileService.uploadFile(
          file.buffer,
          `${uuid()}${fileExtension}`,
        );

        movie.setMovieImage(uploadResult.Location);
      }

      const outcomeMovie = await this._movieRepository.saveMovie( 
        movie,
      );

      if (outcomeMovie === null) { 
        this._logger.info(
          `Failed to save movie data in db for title: ${model.title}.`,
        );

        return new ErrorCreatingItem(
          MovieResourceNames.MovieNameSingular,
          MovieErrorCodes.ErrMovieAdd,
        );
      }

      const displayModel = this.mapper.map(movie, Movie, MovieDisplayModel);

      this._logger.info(
        `Successfully created Movie with title: ${model.title}.`,
      );

      return displayModel;
    } catch (ex) {
      const error = new ErrorCreatingItem(
        MovieResourceNames.MovieNameSingular,
        MovieErrorCodes.ErrMovieAdd,
        null,
        ex,
      );
      this._logger.error(error.loggingDescriptor.logMessage, ex);
      return error;
    }
  }


  /**
   * Delete movie
   * @param movieId
   * @returns Boolean
   */
  async deleteMovie(movieId: string): Promise<boolean | BaseError> {
    try {
      this._logger.info(`Executing delete movie by Id: ${movieId}.`);

      const objMovie = await this._movieRepository.getById(movieId);

      if (objMovie === null) {
        return new ErrorItemNotFound(
          MovieResourceNames.MovieNameSingular,
          MovieErrorCodes.ErrMovieNotFound,
          movieId,
        );
      }

      await this._movieRepository.deleteMovie(objMovie);

      this._logger.info(`Successfully deleted movie detail by Id: ${movieId}`);

      return true;
    } catch (ex) {
      const error = new ErrorDeletingItem(
        MovieResourceNames.MovieNameSingular,
        MovieErrorCodes.ErrMovieDelete,
        movieId,
        ex,
      );
      this._logger.error(error.loggingDescriptor.logMessage, ex);
      return error;
    }
  }


  /**
   * Updates movie Image for given movie Id.
   * @param movieId MovieId
   * @param file Image file
   * @param reqUser LoggedIn User detail
   * @returns Returns movie Display Model
   */
  async updateMovieImage(
    movieId: string,
    file: any,
    reqUser: ReqUserModel,
  ): Promise<MovieDisplayModel | BaseError> {
    try {
      this._logger.info(`Executing get movie by Id: ${movieId}.`);

      const objMovie = await this._movieRepository.getById(movieId);

      if (objMovie === null) {
        return new ErrorItemNotFound(
          MovieResourceNames.MovieNameSingular,
          MovieErrorCodes.ErrMovieNotFound,
          movieId,
        );
      }

      if (!file) {
        objMovie.setMovieImage(null, reqUser.userId);
      } else {
        const fileExtension = file.originalname.substring(
          file.originalname.lastIndexOf('.'),
        );

        const uploadResult = await this._awsFileService.uploadFile(
          file.buffer,
          `${uuid()}${fileExtension}`,
        );

        objMovie.setMovieImage(uploadResult.Location, reqUser.userId);
      }

      const savedMovie = await this._movieRepository.saveMovie(objMovie);

      if (savedMovie === null) {
        this._logger.info(
          `Failed to update Movie Image for Movie: ${savedMovie}`,
        );

        return new ErrorUpdatingItem(
          MovieResourceNames.MovieNameSingular,
          MovieErrorCodes.ErrMovieUpdate,
          movieId,
        );
      }

      const displayModel = this.mapper.map(
        savedMovie,
        Movie,
        MovieDisplayModel,
      );

      this._logger.info(
        `Successfully updated movie Image for MovieId: ${movieId}`,
      );

      return displayModel;
    } catch (ex) {
      const error = new ErrorUpdatingItem(
        MovieResourceNames.MovieNameSingular,
        MovieErrorCodes.ErrMovieUpdate,
        movieId,
        ex,
      );
      this._logger.error(error.loggingDescriptor.logMessage, ex);
      return error;
    }
  }

}