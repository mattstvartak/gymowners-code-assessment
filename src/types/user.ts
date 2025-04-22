export type UserRole = "admin" | "editor" | "viewer";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface UserFilters {
  search: string;
  role: UserRole | "all";
} 