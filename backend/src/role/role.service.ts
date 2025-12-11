import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './entities/role.entity';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private repo: Repository<Role>,
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

  findAll() {
    return this.repo.find();
  }

  findOne(id: string) {
    return this.repo.findOne({ where: { id } });
  }

  async update(id: string, data: UpdateRoleDto) {
    await this.repo.update(id, data);
    return this.findOne(id);
  }

  async remove(id: string) {
    return this.repo.delete(id);
  }
}
