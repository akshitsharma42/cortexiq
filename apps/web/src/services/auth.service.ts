import { User, AuthResponse } from "./auth.types"; // Will create types file

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

let memoryAccessToken: string | null = null;

export const setAccessToken = (token: string | null) => {
  memoryAccessToken = token;
};

export const getAccessToken = () => memoryAccessToken;

async function fetchWithAuth(url: string, options: RequestInit = {}) {
  const headers = new Headers(options.headers || {});
  
  if (memoryAccessToken) {
    headers.set("Authorization", `Bearer ${memoryAccessToken}`);
  }

  const response = await fetch(`${API_URL}${url}`, {
    ...options,
    headers,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "An error occurred");
  }

  return data;
}

export const authService = {
  async register(input: any): Promise<AuthResponse> {
    const data = await fetchWithAuth("/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });
    setAccessToken(data.data.accessToken);
    document.cookie = "isAuthenticated=true; path=/; max-age=86400";
    return data.data;
  },

  async login(input: any): Promise<AuthResponse> {
    const data = await fetchWithAuth("/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });
    setAccessToken(data.data.accessToken);
    document.cookie = "isAuthenticated=true; path=/; max-age=86400";
    return data.data;
  },

  async logout(): Promise<void> {
    try {
      await fetchWithAuth("/auth/logout", { method: "POST" });
    } catch (e) {}
    setAccessToken(null);
    document.cookie = "isAuthenticated=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
  },

  async getCurrentUser(): Promise<{ user: User }> {
    const data = await fetchWithAuth("/auth/me", { method: "GET" });
    return data.data;
  },
};
