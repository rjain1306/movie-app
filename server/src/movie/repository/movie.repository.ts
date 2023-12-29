import { Movie } from './../models/movie.model';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';
import { ListApiQueryDto } from '../../core/dto';

export interface IMovieRepository {
  /**
   * Get movie by Id
   * @param id
   * @returns
   */
  getById(id: string): Promise<Movie>;

  /**
   * Get movie by title
   * @param title
   * @returns
   */
  getByTitle(title: string): Promise<Movie>;

  /**
   * Get all movies
   * @returns
   */
  getAllMovies(query?: ListApiQueryDto): Promise<[Movie[], number]>;

  /**
   * Save movie detail
   * @param movie
   * @returns
   */
  saveMovie(movie: Movie): Promise<Movie>;

  deleteMovie(movie: Movie): Promise<Movie>;
}

@Injectable()
export class MovieRepository implements IMovieRepository {
  constructor(
    @InjectRepository(Movie)
    private readonly _movieRepository: Repository<Movie>,
  ) {}

  /**
   * Get movie by ID
   * @param id
   * @returns
   */
  public async getById(id: string): Promise<Movie> {
    let queryable = this._movieRepository
      .createQueryBuilder('movie')
      .where('movie.id =:id', {
        id,
      });

    const result = await queryable.getOne();
    return result;
  }

  /**
   * Get movie by title
   * @param title
   * @returns
   */
  public async getByTitle(title: string): Promise<Movie> {
    let queryable = this._movieRepository
      .createQueryBuilder('movie')
      .where('movie.title =:title', {
        title,
      });

    const result = await queryable.getOne();
    return result;
  }

   /**
   * Get all Movies 
   * @param query
   * @returns
   */
   public async getAllMovies(query?: ListApiQueryDto ): Promise<[Movie[], number]> {

    const sortBy = query.sortBy
      ? `movie._${query.sortBy}`
      : 'movie._auditInfo._createdAt';

    const sortDir = query.sortBy ? query.sortDir : 'DESC';

    let queryable = this._movieRepository
      .createQueryBuilder('movie')
      
    if (query.searchTerm) {
      queryable = queryable.andWhere(
        // eslint-disable-next-line quotes
        "(movie.title ILIKE :searchTerm OR appuser.publishYear ILIKE :searchTerm)",
        {
          searchTerm: `%${query.searchTerm}%`,
        },
      );
    }

    const result = await queryable
      .orderBy(sortBy, sortDir)
      .skip(query.skip)
      .take(query.take)
      .getManyAndCount();

    return result;
  }

  /**
   * Save User detail
   * @param movie
   * @returns
   */
  public async saveMovie(movie: Movie): Promise<Movie> {
    const result = await this._movieRepository.save(movie);
    return result;
  }

  /**
   * delete User detail
   * @param movie
   * @returns
   */
  public async deleteMovie(movie: Movie): Promise<Movie> {
    const result = await this._movieRepository.remove(movie);
    return result;
  }
}
