import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateUserRolesDto } from './dto/update-user-roles.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() body: CreateUserDto) {
    return this.userService.create(body);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.userService.update(id, body);
  }

  ////////////ROLES MANAGEMENT////////////

  @Patch(':id/roles')
  updateUserRoles(@Param('id') id: string, @Body() body: UpdateUserRolesDto) {
    return this.userService.updateUserRoles(id, body.roleIds);
  }

  @Post(':id/roles/:roleId')
  addRole(@Param('id') userId: string, @Param('roleId') roleId: string) {
    return this.userService.addRoleToUser(userId, roleId);
  }

  @Delete(':id/roles/:roleId')
  removeRole(@Param('id') userId: string, @Param('roleId') roleId: string) {
    return this.userService.removeRoleFromUser(userId, roleId);
  }

  /////////////////////////////////////

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
