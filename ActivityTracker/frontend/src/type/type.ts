export type CompanyDto = {
  ownerName: string;
  ownerEmail: string;
  companyName: string;
  password: string;
  planSectionId: number;
};

export type LoginDto = {
  email: string;
  password: string;
};

export type ImageUploadDto = {
  screenshot: File;
  activityTime: Date | null;
};

export type User = {
  id: number;
  companyId: number;
  name: string;
  email: string;
  role: 'admin' | 'employee';
  isActive: boolean;
  lastLoginAt: Date | string | null;
  createdAt: Date | null | string;
  updateAt: Date | null | string;
};

export type Company = {
  id: number;
  isActive: boolean;
  name: string;
  ownerName: string;
  ownerEmail: string;
  planSectionId: number;
  updatedAt: string | null;
};

export type UserResponse = {
  id: number;
  name: string;
};

export type AdminDashboardResponse = {
  users: UserResponse[];
};

export type UserProfileResponse = {
  id: number;
  companyId: number;
  name: string;
  email: string;
  role: 'admin' | 'employee';
  isActive: boolean;
  lastLoginAt: Date | string | null;
  createdAt: Date | null | string;
  updateAt: Date | null | string;
  company: Company;
};

export type Plan = {
  id: number;
  name: string;
  costPerSeat: string | number;
  description: string;
};

export type Pagination = {
  page: number;
  limit: number;
  sortBy: 'name' | 'lastLoginAt';
  orderBy: 'asc' | 'desc';
};

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    total: number;
    perPage: number;
    currentPage: number;
    lastPage: number;
    firstPageUrl: string;
    lastPageUrl: string;
    nextPageUrl: null | string;
    previousPageUrl: null | string;
  };
}