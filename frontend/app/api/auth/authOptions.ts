/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";

interface User {
  id: string;
  name: string;
}

export const authOptions: NextAuthOptions = {
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing credentials");
        }

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          }
        );

        if (!res.ok) return null;

        const result = await res.json();
        return {
          id: result.user.id,
          name: result.user.name,
          email: result.user.email,
          roles: result.user.roles,
          image: result.user.image,
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.userId = user.id ?? "";
        token.name = user.name ?? "";
        token.email = user.email ?? "";
        token.image = user.image ?? null;
        token.roles = Array.isArray(user.roles)
          ? user.roles.map((r: any) => r.name.toUpperCase())
          : [];
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.userId ?? "";
        session.user.name = token.name ?? "";
        session.user.email = token.email ?? "";
        session.user.image = token.image ?? null;
        session.user.roles = token.roles ?? [];
      }
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
  pages: { signIn: "/login" },
};
