import type { Role } from "./role";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  roles: Role[];
  image?: string | null;
}