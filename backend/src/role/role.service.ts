/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Role } from 'src/entities/role/role.entity';
import { Permission } from 'src/entities/role/permission.entity';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private repo: Repository<Role>,

    @InjectRepository(Permission)
    private permissionRepo: Repository<Permission>,
  ) {}

  async create(data: CreateRoleDto) {
    try {
      const role = this.repo.create(data);
      return await this.repo.save(role);
    } catch (err) {
      if (err.code === '23505') {
        throw new HttpException(
          'Role name already exists',
          HttpStatus.CONFLICT,
        );
      }
      throw err;
    }
  }

  async findAll() {
    const roles = await this.repo.find({
      relations: ['permissions'],
      order: { name: 'ASC' },
    });

    return roles.map((role) => ({
      id: role.id,
      name: role.name,
      permissions: role.permissions.map((p) => ({
        id: p.id,
        name: p.name,
      })),
    }));
  }

  async findOne(id: string) {
    const role = await this.repo.findOne({
      where: { id },
      relations: ['permissions'],
    });

    if (!role) {
      throw new NotFoundException('Role not found');
    }

    return {
      id: role.id,
      name: role.name,
      permissions: role.permissions.map((p) => ({
        id: p.id,
        name: p.name,
      })),
    };
  }

  async update(id: string, data: UpdateRoleDto) {
    await this.repo.update(id, data);
    return this.findOne(id);
  }

  async remove(id: string) {
    const role = await this.repo.findOne({ where: { id } });
    if (!role) {
      throw new NotFoundException('Role not found');
    }

    await this.repo.delete(id);
    return { success: true };
  }

  async assignPermissions(roleId: string, permissionIds: string[]) {
    const role = await this.repo.findOne({
      where: { id: roleId },
      relations: ['permissions'],
    });

    if (!role) throw new NotFoundException('Role not found');

    const permissions = await this.permissionRepo.find({
      where: { id: In(permissionIds) },
    });

    if (permissions.length !== permissionIds.length) {
      throw new BadRequestException('One or more permissions not found');
    }

    role.permissions = permissions;
    await this.repo.save(role);

    return {
      id: role.id,
      name: role.name,
      permissions: permissions.map((p) => ({
        id: p.id,
        name: p.name,
      })),
    };
  }
}
