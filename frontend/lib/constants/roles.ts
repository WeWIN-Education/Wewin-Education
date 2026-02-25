export const ROLES = {
  ADMIN: "ADMIN",
  WAREHOUSE_MANAGER: "WAREHOUSE MANAGER",
  TEACHER: "TEACHER",
  STAFF: "STAFF",
} as const;

export type Role = (typeof ROLES)[keyof typeof ROLES];
