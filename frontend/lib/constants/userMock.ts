import { Permission } from "@/types/permission";
import { Role } from "@/types/role";
import { User } from "@/types/user";

export const MOCK_PERMISSIONS: Permission[] = [
  {
    id: "p1",
    name: "VIEW_PRODUCT",
  },
  {
    id: "p2",
    name: "CREATE_PRODUCT",
  },
  {
    id: "p3",
    name: "UPDATE_PRODUCT",
  },
  {
    id: "p4",
    name: "DELETE_PRODUCT",
    isDisabled: true,
  },
];

export const MOCK_ROLES: Role[] = [
  {
    id: "r1",
    name: "ADMIN",
    isDisabled: false,
    permissions: [...MOCK_PERMISSIONS],
  },
  {
    id: "r2",
    name: "STAFF",
    isDisabled: false,
    permissions: [
      MOCK_PERMISSIONS[0], // VIEW_PRODUCT
      MOCK_PERMISSIONS[2], // UPDATE_PRODUCT
    ],
  },
];

export const MOCK_USERS: User[] = [
  {
    id: "u1",
    name: "Admin System",
    dob: new Date("1990-01-01"),
    address: "123 Nguyễn Trãi, Quận 1, TP.HCM",
    email: "admin@test.com",
    gender: "MALE",
    phone: "0909123456",
    imageUrl: "https://via.placeholder.com/150",
    password: "hashed_password_admin",
    isActive: true,
    roles: [MOCK_ROLES[0]],
    createdAt: new Date("2025-01-01T08:00:00.000Z"),
    updatedAt: new Date("2025-01-05T10:30:00.000Z"),
  },
  {
    id: "u2",
    name: "Nguyễn Văn A",
    dob: new Date("1995-05-20"),
    address: "456 Lê Lợi, Quận 3, TP.HCM",
    email: "staff@test.com",
    gender: "FEMALE",
    phone: "0911222333",
    password: "hashed_password_staff",
    isActive: true,
    roles: [MOCK_ROLES[1]],
    createdAt: new Date("2025-01-02T09:00:00.000Z"),
    updatedAt: new Date("2025-01-05T10:30:00.000Z"),
  },
];
