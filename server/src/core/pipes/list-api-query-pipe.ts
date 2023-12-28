import { PipeTransform } from '@nestjs/common';

export class ListApiQueryPipe implements PipeTransform {
  transform(query): any {
    if (query?.active) {
      if (query.active === 'true' || query.active === true) query.active = true;
      if (query.active === 'false' || query.active === false)
        query.active = false;
    }
    if (query?.archive) {
      if (query.archive === 'true' || query.archive === true)
        query.archive = true;
      if (query.archive === 'false' || query.archive === false)
        query.archive = false;
    }
    if (query?.pagination) {
      if (query.pagination === 'true' || query.pagination === true)
        query.pagination = true;
      if (query.pagination === 'false' || query.pagination === false)
        query.pagination = false;
    }
    if (!query?.take) {
      query.take = 25;
    }
    if (!query?.skip) {
      query.skip = 0;
    }
    return query;
  }
}
