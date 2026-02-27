import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { RequestModule } from './request/request.module';
import { PermissionModule } from './permission/permission.module';
import { ProductModule } from './inventory/product/product.module';
import { CategoryModule } from './inventory/category/category.module';
import { InventoryMovementModule } from './inventory-movement/inventory-movement.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      autoLoadEntities: true,
      synchronize: true, // Dev = true, production = false
      ssl: {
        rejectUnauthorized: false, // Bắt buộc cho Neon
      },
    }),
    UserModule,
    RoleModule,
    AuthModule,
    RequestModule,
    PermissionModule,
    ProductModule,
    CategoryModule,
    InventoryMovementModule,
    CloudinaryModule,
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
