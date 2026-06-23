export interface User {
  id: string;
  name: string;
  email: string;
  plan: string;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
}
