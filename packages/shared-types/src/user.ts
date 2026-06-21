/**
 * User entity types.
 * Placeholder — schemas will be defined in the authentication phase.
 */

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
}

export type UserRole = "owner" | "admin" | "member" | "viewer";

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}
