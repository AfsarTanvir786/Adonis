export type ApiResponse<T = undefined> = {
  success: boolean;
  message: string;
  data?: T;
};

export type Pagination = {
  page: number;
  limit: number;
  sortBy: 'createdAt' | 'name';
  orderBy: 'asc' | 'desc';
};
