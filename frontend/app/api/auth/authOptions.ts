import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";
import axios from "axios";

/* ------------------------------------------
   TYPES
------------------------------------------ */
interface GoogleAccount {
  access_token: string;
  refresh_token?: string;
  expires_in: number;
}

interface GoogleProfile {
  email?: string;
  name?: string;
  picture?: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

/* ------------------------------------------
   MAIN CONFIG
------------------------------------------ */
export const authOptions: NextAuthOptions = {
  providers: [
    /* ------------------------------------------
       GOOGLE PROVIDER
    ------------------------------------------ */
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: [
            "openid",
            "email",
            "profile",
            "https://www.googleapis.com/auth/drive.file",
            "https://www.googleapis.com/auth/spreadsheets",
            "https://www.googleapis.com/auth/gmail.send",
          ].join(" "),
          access_type: "offline",
          prompt: "consent",
        },
      },
    }),

    /* ------------------------------------------
       CREDENTIALS PROVIDER
    ------------------------------------------ */
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials: any) {
        try {
          console.log("[AUTHORIZE] Attempting login with:", { email: credentials.email });
          
          const res = await axios.post(`${API_URL}/auth/login`, {
            email: credentials.email,
            password: credentials.password,
          });

          const data = res.data;
          console.log("[AUTHORIZE] Response:", { 
            hasToken: !!data?.access_token,
            userId: data?.user?.id,
            email: data?.user?.email,
          });

          if (!data?.access_token) {
            console.log("[AUTHORIZE] No access token in response");
            return null;
          }

          const user = {
            id: data.user.id,
            email: (data.user.email ?? "").toLowerCase(),
            name: data.user.name ?? "",
            image: null,
            backendAccessToken: data.access_token,
          };
          
          console.log("[AUTHORIZE] Success, returning user:", {
            id: user.id,
            email: user.email,
            name: user.name,
          });
          
          return user;
        } catch (e: any) {
          console.error("[AUTHORIZE] Error:", e?.response?.data || e?.message);
          return null;
        }
      },
    }),
  ],

  session: { strategy: "jwt" },

  /* ------------------------------------------
     CALLBACKS
  ------------------------------------------ */
  callbacks: {
    /* ---------- JWT CALLBACK ---------- */
    async jwt({ token, user, account, profile }) {
      /* --- CASE 1: CREDENTIALS LOGIN --- */
      if (user?.backendAccessToken) {
        console.log("[JWT] Credentials user object:", {
          id: user.id,
          email: user.email,
          name: user.name,
          hasToken: !!user.backendAccessToken,
        });
        
        token.backendAccessToken = user.backendAccessToken;
        token.userId = user.id ?? "";
        token.email = (user.email ?? "").toLowerCase();
        token.name = user.name ?? "";
        token.image = user.image ?? null;
        token.loginType = "credentials";
        
        console.log("[JWT] Credentials token set:", {
          userId: token.userId,
          email: token.email,
          loginType: token.loginType,
        });
        return token;
      }

      /* --- CASE 2: GOOGLE LOGIN --- */
      const acc = account as unknown as GoogleAccount | null;
      const pf = profile as unknown as GoogleProfile | null;

      if (acc && pf) {
        token.googleAccessToken = acc.access_token;
        token.googleRefreshToken = acc.refresh_token;
        token.googleExpiresAt = Date.now() + acc.expires_in * 1000;
        token.loginType = "google";

        try {
          const res = await fetch(`${API_URL}/auth/google-login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: pf.email,
              name: pf.name,
              image: pf.picture,
            }),
          });

          const data = await res.json();

          token.userId = data?.id ?? "";
          token.email = (data?.email ?? pf.email ?? "").toLowerCase();
          token.name = data?.name ?? pf.name ?? "";
          token.image = data?.image ?? pf.picture ?? null;
        } catch (err) {
          console.error("Google sync error:", err);

          token.userId = pf.email ?? "";
          token.email = (pf.email ?? "").toLowerCase();
          token.name = pf.name ?? "";
          token.image = pf.picture ?? null;
          token.loginType = "google";
        }

        return token;
      }

      /* --- AUTO REFRESH GOOGLE TOKEN --- */
      if (token.loginType === "google") {
        if (Date.now() < (token.googleExpiresAt as number)) return token;
        return refreshGoogleAccessToken(token);
      }

      return token;
    },

    /* ---------- SESSION CALLBACK ---------- */
    async session({ session, token }) {
      console.log("[SESSION] Token from JWT:", {
        userId: token.userId,
        email: token.email,
        loginType: token.loginType,
      });
      
      session.user = {
        id: token.userId ?? "",
        email: (token.email ?? "").toLowerCase(),
        name: token.name ?? "",
        image: token.image ?? null,
      };

      session.accessToken =
        token.backendAccessToken ?? token.googleAccessToken ?? "";

      session.loginType = token.loginType ?? "";

      console.log("[SESSION] Final session user:", {
        email: session.user?.email,
        loginType: session.loginType,
      });
      return session;
    },
  },

  pages: { signIn: "/login" },
  secret: process.env.NEXTAUTH_SECRET,
};

/* ------------------------------------------
   REFRESH GOOGLE TOKEN
------------------------------------------ */
async function refreshGoogleAccessToken(token: JWT) {
  try {
    const res = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
        client_secret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET!,
        grant_type: "refresh_token",
        refresh_token: token.googleRefreshToken as string,
      }),
    });

    const refreshed = await res.json();
    if (!res.ok) throw refreshed;

    return {
      ...token,
      googleAccessToken: refreshed.access_token,
      googleExpiresAt: Date.now() + refreshed.expires_in * 1000,
      googleRefreshToken: refreshed.refresh_token ?? token.googleRefreshToken,
    };
  } catch (err) {
    console.error("Google Refresh Error:", err);
    return { ...token, error: "RefreshAccessTokenError" };
  }
}
