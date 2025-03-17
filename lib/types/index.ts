export interface User {
  id: number;
  login: string;
  avatar_url: string;
  html_url: string;
}

export interface Repository {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
}

export interface PaginationState {
  currentPage: number;
  totalCount: number;
  hasNextPage: boolean;
}

export interface GitHubState {
  users: User[];
  repositories: Repository[];
  usersPagination: PaginationState;
  reposPagination: PaginationState;
  loading: boolean;
  error: string | null;
  searchTerm: string;
}
