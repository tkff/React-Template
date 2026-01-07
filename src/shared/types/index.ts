/**
 * Common type utilities and shared types
 */

// API response wrapper type
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

// Pagination types
export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface PaginationParams {
  page?: number;
  pageSize?: number;
}

// Error types
export interface ApiError {
  message: string;
  code?: string;
  errors?: Record<string, string[]>;
}

// Utility types
export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;

// Make specific keys optional
export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

// Make specific keys required
export type RequiredBy<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;
