import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { In, Repository } from 'typeorm';
import { Role } from 'src/role/entities/role.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private repo: Repository<User>,

    @InjectRepository(Role)
    private roleRepo: Repository<Role>,
  ) {}

  async create(data: CreateUserDto) {
    const roles = data.roleIds?.length
      ? await this.roleRepo.find({ where: { id: In(data.roleIds) } })
      : [];

    const user = this.repo.create({
      name: data.name,
      email: data.email,
      password: data.password,
      roles,
    });

    return this.repo.save(user);
  }

  findAll() {
    return this.repo.find({ relations: ['roles'] });
  }

  findOne(id: string) {
    return this.repo.findOne({ where: { id }, relations: ['roles'] });
  }

  async update(id: string, data: UpdateUserDto) {
    let roles: Role[] | undefined = undefined;

    if (data.roleIds) {
      roles = await this.roleRepo.find({ where: { id: In(data.roleIds) } });
    }

    await this.repo.update(id, {
      ...data,
      ...(roles ? { roles } : {}),
    });

    return this.findOne(id);
  }

  remove(id: string) {
    return this.repo.delete(id);
  }

  findByEmail(email: string) {
    return this.repo.findOne({ where: { email } });
  }

  async updateRefreshToken(userId: string, refreshToken: string | null) {
    await this.repo.update(userId, { refreshToken });
  }

  async findById(id: string) {
    return this.repo.findOne({
      where: { id },
    });
  }
}
