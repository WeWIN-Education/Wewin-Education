import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      roles: string[];
      image?: string | null;
    } & DefaultSession["user"];
  }
  interface User extends DefaultUser {
    roles?: string[];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    userId: string;
    name: string;
    email: string;
    roles: string[];
    image?: string | null;
  }
}
