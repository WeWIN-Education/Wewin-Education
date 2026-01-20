import { IsArray, IsUUID } from 'class-validator';

export class UpdateUserRolesDto {
  @IsArray()
  @IsUUID('4', { each: true })
  roleIds: string[];
}
