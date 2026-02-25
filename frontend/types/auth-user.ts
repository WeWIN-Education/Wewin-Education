import type { Role } from "./role";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  roles: Role[];
  accessToken?: string;
  image?: string | null;
}