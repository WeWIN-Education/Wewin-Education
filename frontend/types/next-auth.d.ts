import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    loginType?: "google" | "credentials";
    error?: string;
    user: {
      id?: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }

  interface User extends DefaultUser {
    backendAccessToken?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    backendAccessToken?: string;
    googleAccessToken?: string;
    googleRefreshToken?: string;
    googleExpiresAt?: number;
    loginType?: "google" | "credentials";
    userId?: string;
    error?: string;
  }
}
