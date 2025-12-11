import { IsNotEmpty, IsString, IsBoolean } from 'class-validator';

export class CreateRoleDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsBoolean()
  isDisabled?: boolean;
}
