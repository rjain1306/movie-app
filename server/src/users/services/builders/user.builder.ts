/* eslint-disable newline-per-chained-call */
import { AddUserModel } from '../../dto/add-user-model';
import { User } from '../../models';
import { v4 as uuid } from 'uuid';

export class UserBuilder {
  static Build(
    model: AddUserModel,
    hashedPassword: string,
    createdBy: string = '',
  ): User {

  

    const user = new User(
      uuid(),
      model.name,
      model.emailAddress,
      hashedPassword,
      createdBy,
    );

    return user;
  }
}
