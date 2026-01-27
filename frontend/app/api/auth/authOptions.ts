import type { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { Routes } from "@/lib/constants/routes";
import type { JWT } from "next-auth/jwt";

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

        const result = await res.json();

        return {
          id: result.user.id,
          name: result.user.name,
          email: result.user.email,
          image: result.user.image ?? null,
          roles: result.user.roles ?? [],
          access_token: result.access_token,
          refresh_token: result.refresh_token,
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.access_token = user.access_token;
        token.refresh_token = user.refresh_token;
        token.accessTokenExpires = Date.now() + 15 * 60 * 1000;
        token.roles = user.roles;
        token.sub = user.id;
        return token;
      }

      if (token.accessTokenExpires && Date.now() < token.accessTokenExpires) {
        return token;
      }

      return refreshAccessToken(token);
    },

    async session({ session, token }) {
      session.access_token = token.access_token;
      session.refresh_token = token.refresh_token;

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

async function refreshAccessToken(token: JWT): Promise<JWT> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token.refresh_token}`,
      },
    });

    if (!res.ok) throw new Error("Refresh failed");

    const data: { access_token: string } = await res.json();

    return {
      ...token,
      access_token: data.access_token,
      accessTokenExpires: Date.now() + 15 * 60 * 1000,
    };
  } catch {
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}
