import { Module } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { PermissionController } from './permission.controller';
import { Permission } from 'src/entities/role/permission.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([Permission]), // ⭐ CỰC KỲ QUAN TRỌNG
  ],
  controllers: [PermissionController],
  providers: [PermissionService],
  exports: [PermissionService], // (optional – dùng khi role cần)
})
export class PermissionModule {}
