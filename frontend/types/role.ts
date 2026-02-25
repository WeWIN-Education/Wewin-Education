import { Permission } from "./permission";

export interface Role {
  id: string;
  name: string;
  isDisabled?: boolean;
  permissions: Permission[];
}
