import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      roles: Role[];
      image?: string | null;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    name: string;
    email: string;
    image?: string | null;
    roles: Role[];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    userId: string;
    name: string;
    email: string;
    roles: Role[];
    image?: string | null;
  }
}
