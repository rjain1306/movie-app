/* eslint-disable newline-per-chained-call */
import { AddMovieModel } from '../../dto/add-movie-model';
import { Movie } from '../../models';
import { v4 as uuid } from 'uuid';

export class MovieBuilder {
  static Build(
    model: AddMovieModel,
    createdBy: string = '',
  ): Movie {

    const movie = new Movie(
      uuid(),
      model.title,
      model.publishYear,
      "",
      createdBy,
    );

    return movie;
  }
}
