

import { UserBuilder } from './builders/user.builder';
import { Inject, Injectable } from '@nestjs/common';
import 'reflect-metadata';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { WinstonLogger } from '../../utils/logger';
import { User } from '../models';
import {
  ErrorUserExists,
  UserResourceNames,
  UserErrorCodes,
} from '../error-codes';
import {
  UserRepository,
  IUserRepository,
} from '../repository';
import { BaseError } from '../../utils/errors/base-error';
import {
  ErrorItemNotFound,
  ErrorCreatingItem,
  ErrorDeletingItem,
  ErrorUpdatingItem
} from '../../core/error-codes';

import {
  AddUserModel,
  UserDisplayModel,
} from '../dto';
import {
  ReqUserModel,
} from '../../core/dto';
import { AwsFilesService } from '../../utils/aws/s3/aws-file.service';
import { v4 as uuid } from 'uuid';
import { AddUserValidator } from '../validators/add-user-validator';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectMapper()
    private mapper: Mapper,
    private _logger: WinstonLogger,

    @Inject(UserRepository)
    private readonly _userRepository: IUserRepository,

    private readonly _awsFileService: AwsFilesService,

  ) {}


  /**
   * Create User
   */
  async createUser(
    model: AddUserModel,
  ): Promise<UserDisplayModel | BaseError> {
    try {
      this._logger.info(
        `Executing add User with Payload: ${JSON.stringify(model)}.`,
      );

      const validateOutcome = AddUserValidator.Validate(model);

      if (validateOutcome instanceof BaseError) {
        return validateOutcome;
      }

      const userExists = await this._userRepository.getByEmail(
        model.emailAddress, 
      );

      if (userExists !== null) {
        return new ErrorUserExists(model.emailAddress);
      }
      const hashedPassword = await bcrypt.hash(model.password, 12);
      const user = UserBuilder.Build(model, hashedPassword);

      const outcomeUser = await this._userRepository.saveUser( 
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
   * Delete User
   * @param userId
   * @returns Boolean
   */
  async deleteUser(userId: string): Promise<boolean | BaseError> {
    try {
      this._logger.info(`Executing delete user by Id: ${userId}.`);

      const objUser = await this._userRepository.getById(userId);

      if (objUser === null) {
        return new ErrorItemNotFound(
          UserResourceNames.UserNameSingular,
          UserErrorCodes.ErrUserNotFound,
          userId,
        );
      }

      await this._userRepository.deleteUser(objUser);

      this._logger.info(`Successfully deleted user detail by Id: ${userId}`);

      return true;
    } catch (ex) {
      const error = new ErrorDeletingItem(
        UserResourceNames.UserNameSingular,
        UserErrorCodes.ErrUserDelete,
        userId,
        ex,
      );
      this._logger.error(error.loggingDescriptor.logMessage, ex);
      return error;
    }
  }


  /**
   * Updates user profile photo for given user.
   * @param userId UserId
   * @param file Image file
   * @param reqUser LoggedIn User detail
   * @returns Returns User Display Model
   */
  async updateUserProfilePic(
    userId: string,
    file: any,
    reqUser: ReqUserModel,
  ): Promise<UserDisplayModel | BaseError> {
    try {
      this._logger.info(`Executing get user by Id: ${userId}.`);

      const objUser = await this._userRepository.getById(userId);

      if (objUser === null) {
        return new ErrorItemNotFound(
          UserResourceNames.UserNameSingular,
          UserErrorCodes.ErrUserNotFound,
          userId,
        );
      }

      if (!file) {
        objUser.setProfilePhoto(null, reqUser.userId);
      } else {
        const fileExtension = file.originalname.substring(
          file.originalname.lastIndexOf('.'),
        );

        const uploadResult = await this._awsFileService.uploadFile(
          file.buffer,
          `${uuid()}${fileExtension}`,
        );

        objUser.setProfilePhoto(uploadResult.Location, reqUser.userId);
      }

      const savedUser = await this._userRepository.saveUser(objUser);

      if (savedUser === null) {
        this._logger.info(
          `Failed to update User profile photo for User: ${userId}`,
        );

        return new ErrorUpdatingItem(
          UserResourceNames.UserNameSingular,
          UserErrorCodes.ErrUserUpdate,
          userId,
        );
      }

      const displayModel = this.mapper.map(
        savedUser,
        User,
        UserDisplayModel,
      );

      this._logger.info(
        `Successfully updated User profile for UserId: ${userId}`,
      );

      return displayModel;
    } catch (ex) {
      const error = new ErrorUpdatingItem(
        UserResourceNames.UserNameSingular,
        UserErrorCodes.ErrUserUpdate,
        userId,
        ex,
      );
      this._logger.error(error.loggingDescriptor.logMessage, ex);
      return error;
    }
  }

}
