import "next-auth";
import "next-auth/jwt";
import type { AuthUser } from "@/types/auth-user";

declare module "next-auth" {
  interface Session {
    user: AuthUser;
  }

  interface User {
    id: string;
    name: string;
    email: string;
    image?: string | null;
    roles: AuthUser["roles"];
    accessToken?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user?: AuthUser;
  }
}
