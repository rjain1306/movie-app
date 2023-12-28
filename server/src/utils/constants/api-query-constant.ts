import { SortByDirectionEnum, ActiveStatusEnum } from '../enums';

export const PaginationSearchTerm = {
  required: false,
  name: 'searchTerm',
  description: 'Search By: action',
};

export const PaginationSkip = {
  name: 'skip',
  required: false,
  example: 0,
  description: 'Records to skip',
};

export const PaginationTake = {
  name: 'take',
  required: false,
  example: 10,
  description: 'Records to take',
};

export const PaginationSortBy = {
  name: 'sortBy',
  required: false,
  example: 'id',
  description: 'Sort by column name',
};

export const PaginationSortDirection = {
  name: 'sortDir',
  required: false,
  enum: SortByDirectionEnum,
  example: SortByDirectionEnum.ASC,
  description: 'Default value : ASC',
};

export const ActiveStatus = {
  required: false,
  name: 'active',
  enum: ActiveStatusEnum,
  description:
    'Returns active records if true, else deactivated records. If null then returns both active and deactive records.',
};

export const ArchiveStatus = {
  required: false,
  name: 'archive',
  enum: ActiveStatusEnum,
  description:
    'Returns archived records if true, else not archived records. If null then returns both archived and not archived records.',
};

export const FilterBy = {
  required: false,
  name: 'filterBy',
  description: 'filter by: action.',
};
