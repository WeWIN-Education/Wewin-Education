import { Role } from "./role";

export interface User {
  id: string;
  name: string;
  dob: Date;
  address: string;
  email: string;
  gender: string;
  phone: string;
  imageUrl?: string;
  password: string;
  isActive: boolean;
  roles: Role[];
  createdAt: Date;
  updatedAt: Date;
}
