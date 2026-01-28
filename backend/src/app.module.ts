import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { OrderModule } from './order/order.module';
import { PermissionModule } from './permission/permission.module';
import { ProductModule } from './inventory/product/product.module';
import { CategoryModule } from './inventory/product/category/category.module';

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
    OrderModule,
    PermissionModule,
    ProductModule,
    CategoryModule,
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
