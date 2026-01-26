import "next-auth";
import "next-auth/jwt";
import type { Role } from "@/types/role";

declare module "next-auth" {
  interface Session {
    access_token?: string;
    user: {
      id: string;
      name: string;
      email: string;
      image?: string | null;
      roles: Role[];
    };
  }

  interface User {
    id: string;
    name: string;
    email: string;
    image?: string | null;
    roles: Role[];
    access_token?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    roles?: Role[];
  }
}
