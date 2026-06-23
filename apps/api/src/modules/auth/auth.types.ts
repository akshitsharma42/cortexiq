import { IUser } from "../../models/user.model";

export interface AuthResponse {
  user: {
    id: string;
    name: string;
    email: string;
    plan: string;
  };
  accessToken: string;
  refreshToken: string;
}

// Extend Express Request to include authenticated user
declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}
