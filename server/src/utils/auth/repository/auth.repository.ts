import { User } from '../../../users/models/user.model';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';
import { GetApiQueryDto } from '../../../core/dto';

export interface IAuthRepository {
  /**
   * Get Invitation by Id
   * @param id
   * @returns
   */
  getById(id: string, query?: GetApiQueryDto): Promise<User>;

  /**
   * Get User by email
   * @param id
   * @returns
   */
  getByEmail(email: string, userId?: string): Promise<User>;

  /**
   * Save Users detail
   * @param appUser
   * @returns
   */
  saveUser(appUser: User): Promise<User>;

  deleteUser(appUser: User): Promise<User>;
}

@Injectable()
export class AuthRepository implements IAuthRepository {
  constructor(
    @InjectRepository(User)
    private readonly _authRepository: Repository<User>,
  ) {}

  /**
   * Get Invitation by Id
   * @param id
   * @returns
   */
  public async getById(id: string, query?: GetApiQueryDto): Promise<User> {
    let queryable = this._authRepository
      .createQueryBuilder('user')
      .where('user.id =:id', {
        id,
      });

    const result = await queryable.getOne();
    return result;
  }

  /**
   * Get User by email
   * @param id
   * @param userId
   * @returns
   */
  public async getByEmail(
    email: string,
    userId: string = null,
  ): Promise<User> {
    let queryable = await this._authRepository
      .createQueryBuilder('user')
      .where('user.email_address =:email', {
        email,
      });

    if (userId) {
      queryable = queryable.andWhere('user.id != :userId', {
        userId,
      });
    }

    const result = await queryable.getOne();

    return result;
  }

  /**
   * Save User detail
   * @param invitation
   * @returns
   */
  public async saveUser(user: User): Promise<User> {
    const result = await this._authRepository.save(user);
    return result;
  }

  public async deleteUser(appUser: User): Promise<User> {
    const result = await this._authRepository.remove(appUser);
    return result;
  }
}
