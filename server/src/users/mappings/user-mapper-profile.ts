import {
  createMap,
  Mapper,
} from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { UserDisplayModel } from '../dto';
import { User } from '../models';

@Injectable()
export class UsersMapperProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }
  override get profile() {
    return (mapper: any) => {
      createMap(
        mapper,
        User,
        UserDisplayModel,
      );
    };
  }
}
