

import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import 'reflect-metadata';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { WinstonLogger } from '../../../utils/logger';
import { User } from '../../../users/models';
import {
  AuthRepository,
  IAuthRepository,
} from '../repository';
import { BaseError } from '../../../utils/errors/base-error';
import {
  ErrorCreatingItem,
} from '../../../core/error-codes';

import * as bcrypt from 'bcrypt';
import {JwtService} from "@nestjs/jwt";
import { loginModel } from '../dto/loginModel';
import { Response } from 'express';
import { AddUserModel, UserDisplayModel } from '../../../users/dto';
import { ErrorUserExists, UserErrorCodes, UserResourceNames } from '../../../users/error-codes';
import { UserBuilder } from '../../../users/services/builders/user.builder';

@Injectable()
export class AuthService {

  constructor(
    @InjectMapper()
    private mapper: Mapper,
    private _logger: WinstonLogger,

    @Inject(AuthRepository)
    private readonly _authRepository: IAuthRepository,

    private jwtService: JwtService

  ) {}

   /**
   * Sign up User
   */
   async registerUser(
    model: AddUserModel
  ): Promise<UserDisplayModel | BaseError> {
    try {
        this._logger.info(
            `login User with Payload: ${JSON.stringify(model)}.`,
        );

        const userExists = await this._authRepository.getByEmail(
          model.emailAddress, 
        );
  
        if (userExists !== null) {
          return new ErrorUserExists(model.emailAddress);
        }
        const hashedPassword = await bcrypt.hash(model.password, 12);
        const user = UserBuilder.Build(model, hashedPassword);
  
        const outcomeUser = await this._authRepository.saveUser( 
          user,
        );
  
        if (outcomeUser === null) { 
          this._logger.info(
            `Failed to save user data in db for Email: ${model.emailAddress}.`,
          );
  
          return new ErrorCreatingItem(
            UserResourceNames.UserNameSingular,
            UserErrorCodes.ErrUserAdd,
          );
        }
  
        const displayModel = this.mapper.map(user, User, UserDisplayModel);
  
        this._logger.info(
          `Successfully created User with Email: ${model.emailAddress}.`,
        );
  
        return displayModel;
    } catch (ex) {
      const error = new ErrorCreatingItem(
        UserResourceNames.UserNameSingular,
        UserErrorCodes.ErrUserAdd,
        null,
        ex,
      );
      this._logger.error(error.loggingDescriptor.logMessage, ex);
      return error;
    }
  }

  /**
   * login User
   */
  async loginUser(
    model: loginModel,
    response: Response
  ): Promise<Boolean | BaseError> {
    try {
        this._logger.info(
            `login User with Payload: ${JSON.stringify(model)}.`,
        );

        const user = await this._authRepository.getByEmail(
            model.emailAddress, 
        );

        if (!user) {
            throw new BadRequestException('invalid credentials');
        }
 
        if (!await bcrypt.compare(model.password, user.password)) {
            throw new BadRequestException('invalid credentials');
        }

        const jwt = await this.jwtService.signAsync({id: user.id, sub: user.id, userName: user.name});

        this._logger.info(
            `Successfully created User with Email: ${model.emailAddress}.`,
        );

        response.cookie('jwt', jwt, {httpOnly: true});
        return true;
    } catch (ex) {
        const error = new BadRequestException('invalid credentials');
        this._logger.error(error.message, ex);
        throw error;
    }
  }

}
