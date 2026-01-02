export type Pagination = {
  page: number;
  limit: number;
  sortBy: 'lastLoginAt' | 'name';
  orderBy: 'asc' | 'desc';
};

