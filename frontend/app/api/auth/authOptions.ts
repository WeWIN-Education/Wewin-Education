import type { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { Routes } from "@/lib/constants/routes";

type LoginResponse = {
  access_token: string;
  user: {
    id: string;
    name: string;
    email: string;
    image?: string | null;
    roles: Array<{
      id: string;
      name: string;
      isDisabled?: boolean;
      permissions: Array<{
        id: string;
        name: string;
      }>;
    }>;
  };
};

export const authOptions: NextAuthOptions = {
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          },
        );

        if (!res.ok) return null;

        const result = (await res.json()) as LoginResponse;

        return {
          id: result.user.id,
          name: result.user.name,
          email: result.user.email,
          image: result.user.image ?? null,
          roles: result.user.roles ?? [], // 🔒 QUAN TRỌNG
          access_token: result.access_token,
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.access_token = user.access_token;
        token.roles = user.roles;
        token.sub = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      session.access_token = token.access_token as string;

      session.user = {
        id: token.sub!,
        name: session.user?.name ?? "",
        email: session.user?.email ?? "",
        image: session.user?.image ?? null,
        roles: token.roles ?? [],
      };

      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
  pages: { signIn: Routes.LOGIN },
};
