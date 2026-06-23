import User from "../../models/user.model";
import { hashPassword, comparePassword } from "../../lib/bcrypt";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../../lib/jwt";
import type { AuthResponse } from "./auth.types";
import type { RegisterInput, LoginInput } from "./auth.validation";

function formatUser(user: any) {
  return {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    plan: user.plan,
  };
}

function generateTokens(userId: string) {
  return {
    accessToken: generateAccessToken({ userId }),
    refreshToken: generateRefreshToken({ userId }),
  };
}

export async function registerUser(input: RegisterInput): Promise<AuthResponse> {
  const existingUser = await User.findOne({ email: input.email });
  if (existingUser) {
    const error = new Error("User already exists") as any;
    error.statusCode = 409;
    throw error;
  }

  const hashedPassword = await hashPassword(input.password);

  const user = await User.create({
    name: input.name,
    email: input.email,
    password: hashedPassword,
  });

  const tokens = generateTokens(user._id.toString());

  return {
    user: formatUser(user),
    ...tokens,
  };
}

export async function loginUser(input: LoginInput): Promise<AuthResponse> {
  // +password overrides select: false on the schema
  const user = await User.findOne({ email: input.email }).select("+password");
  if (!user) {
    const error = new Error("Invalid email or password") as any;
    error.statusCode = 401;
    throw error;
  }

  const isMatch = await comparePassword(input.password, user.password);
  if (!isMatch) {
    const error = new Error("Invalid email or password") as any;
    error.statusCode = 401;
    throw error;
  }

  const tokens = generateTokens(user._id.toString());

  return {
    user: formatUser(user),
    ...tokens,
  };
}

export async function refreshTokens(refreshToken: string): Promise<{ accessToken: string; refreshToken: string }> {
  const payload = verifyRefreshToken(refreshToken);

  const user = await User.findById(payload.userId);
  if (!user) {
    const error = new Error("User not found") as any;
    error.statusCode = 401;
    throw error;
  }

  return generateTokens(user._id.toString());
}

export async function getCurrentUser(userId: string) {
  const user = await User.findById(userId);
  if (!user) {
    const error = new Error("User not found") as any;
    error.statusCode = 404;
    throw error;
  }

  return formatUser(user);
}
