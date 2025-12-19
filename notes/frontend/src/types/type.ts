export interface User {
    id: number;
    companyId: number;
    name: string | null;
    email: string;
    role: 'owner' | 'admin' | 'member';
    createdAt: string;
    updatedAt: string | null;
    company?: Company;
}

export interface LoginUser {
    email: string;
    password: string;
}

export interface Company {
    id: number;
    name: string;
    createdAt: string;
    updatedAt: string | null;
}

export interface Workspace {
    id: number;
    companyId: number;
    userId: number;
    name: string;
    description: string | null;
    createdAt: string;
    updatedAt: string | null;
}

export interface Note {
  id: number;
  workspaceId: number;
  userId: number;
  title: string;
  content: string | null;
  type: 'public' | 'private';
  count: number;
  isDraft: boolean;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string | null;
  user?: User;
  workspace?: Workspace;
  tags?: Tag[];
}

export interface Tag {
    id: number;
    name: string;
    createdAt: string;
    updatedAt: string | null;
}

export interface History {
  id: number;
  noteId: number;
  userId: number;
  oldTitle: string;
  oldContent: string;
  createdAt: string;
  updatedAt: string | null;
}

export type NoteVote = {
    id: number;
    noteId: number;
    userId: number;
    vote: 'up' | 'down';
    createdAt: string;
    updatedAt: string | null;
};

export type Pagination = {
  page: number;
  limit: number;
  sortBy: 'createdAt' | 'name';
  orderBy: 'asc' | 'desc';
};

export interface PaginatedResponse<T> {
  success: boolean;
  data: {
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
  };
}