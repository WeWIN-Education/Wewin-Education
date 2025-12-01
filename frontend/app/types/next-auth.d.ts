import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role?: string | null;
    };
    accessToken?: string;
    loginType?: string;
    error?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    userId?: string;

    backendAccessToken?: string;

    googleAccessToken?: string;
    googleRefreshToken?: string;
    googleExpiresAt?: number;

    name?: string | null;
    email?: string | null;
    image?: string | null;

    loginType?: string;
    error?: string;
  }
}
