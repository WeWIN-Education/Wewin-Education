import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
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

  async addRoleToUser(userId: string, roleId: string) {
    const user = await this.repo.findOne({
      where: { id: userId },
      relations: ['roles'],
    });
    if (!user) throw new NotFoundException('User not found');

    const role = await this.roleRepo.findOne({ where: { id: roleId } });
    if (!role) throw new NotFoundException('Role not found');

    const hasRole = user.roles.some((r) => r.id === roleId);
    if (hasRole) {
      throw new BadRequestException('User already has this role');
    }

    user.roles.push(role);
    await this.repo.save(user);

    return {
      id: user.id,
      email: user.email,
      roles: user.roles,
    };
  }

  async updateUserRoles(userId: string, roleIds: string[]) {
    const user = await this.repo.findOne({
      where: { id: userId },
      relations: ['roles'],
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const roles = await this.roleRepo.find({
      where: { id: In(roleIds) },
    });

    if (roles.length !== roleIds.length) {
      throw new BadRequestException('One or more roles not found');
    }

    user.roles = roles;
    await this.repo.save(user);

    return {
      id: user.id,
      email: user.email,
      roles: roles,
    };
  }

  async removeRoleFromUser(userId: string, roleId: string) {
    const user = await this.repo.findOne({
      where: { id: userId },
      relations: ['roles'],
    });
    if (!user) throw new NotFoundException('User not found');

    const hasRole = user.roles.some((r) => r.id === roleId);
    if (!hasRole) {
      throw new BadRequestException('User does not have this role');
    }

    if (user.roles.length === 1) {
      throw new BadRequestException('User must have at least one role');
    }

    user.roles = user.roles.filter((r) => r.id !== roleId);
    await this.repo.save(user);

    return {
      id: user.id,
      email: user.email,
      roles: user.roles,
    };
  }

  remove(id: string) {
    return this.repo.delete(id);
  }

  findByEmail(email: string) {
    return this.repo.findOne({
      where: { email },
      select: [
        'id',
        'name',
        'email',
        'password',
        'refreshToken',
        'isActive',
        'dob',
        'address',
        'phone',
        'image',
      ],
      relations: ['roles'],
    });
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
