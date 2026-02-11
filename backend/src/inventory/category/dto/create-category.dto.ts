import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({ example: 'Bàn học sinh cao cấp' })
  @IsString()
  @IsNotEmpty()
  name: string;
}
