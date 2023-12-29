import {
  createMap,
  Mapper,
} from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { MovieDisplayModel } from '../dto';
import { Movie } from '../models';

@Injectable()
export class MovieMapperProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }
  override get profile() {
    return (mapper: any) => {
      createMap(
        mapper,
        Movie,
        MovieDisplayModel,
      );
    };
  }
}
