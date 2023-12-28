
export class ListApiQueryDto {
  skip = 0;
  take = 10;

  include: string[] = null;

  sortBy: string = null;

  sortDir: 'ASC' | 'DESC' = 'ASC';

  searchTerm: string = null;

  filterBy: string = null;

}

export class GetApiQueryDto {
  include: string[] = null;

  mode = 'id';
}
