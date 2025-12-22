import { Pagination } from '../utils/types.js';

export function normalizePagination(filter: Partial<Pagination>): Pagination {
  return {
    page: filter.page ?? 1,
    limit: filter.limit ?? 20,
    sortBy: ['createdAt', 'name', 'title'].includes(filter.sortBy ?? '')
      ? filter.sortBy!
      : 'createdAt',
    orderBy: filter.orderBy ?? 'desc',
  };
}
