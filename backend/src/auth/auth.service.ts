/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import bcrypt from 'bcrypt';
import { JwtPayload } from './types/jwt-payload.type';

const ACCESS_TOKEN_EXPIRES_IN = 15 * 60; // seconds
const REFRESH_TOKEN_EXPIRES_IN = 30 * 24 * 60 * 60; // seconds

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwt: JwtService,
  ) {}

  /* ---------------------------------------------------------
     REGISTER
  --------------------------------------------------------- */
  async register(data: any) {
    const existed = await this.userService.findByEmail(data.email);
    if (existed) {
      throw new BadRequestException('Email already exists');
    }

    const hashed = await bcrypt.hash(data.password, 10);

    return this.userService.create({
      ...data,
      message: 'Register success',
      password: hashed,
      isActive: true,
    });
  }

  /* ---------------------------------------------------------
     LOGIN (CREDENTIALS)
  --------------------------------------------------------- */
  async login(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    if (!user || !user.password) {
      throw new UnauthorizedException('Wrong email or password');
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new UnauthorizedException('Wrong email or password');

    const roles =
      user.roles?.map((r) => ({
        id: r.id,
        name: r.name,
        permissions:
          r.permissions?.map((p) => ({
            id: p.id,
            name: p.name,
          })) ?? [],
      })) ?? [];

    const payload = {
      sub: user.id,
      email: user.email,
      roleIds: roles.map((r) => r.id),
    };

    const access_token = this.jwt.sign(payload, {
      expiresIn: ACCESS_TOKEN_EXPIRES_IN,
    });

    const refresh_token = this.jwt.sign(
      { sub: user.id },
      { expiresIn: REFRESH_TOKEN_EXPIRES_IN },
    );

    // ✅ HASH refresh token
    const hashed = await bcrypt.hash(refresh_token, 10);
    await this.userService.updateRefreshToken(user.id, hashed);

    const { password: _pw, refreshToken: _rt, ...safeUser } = user;

    return {
      message: 'Login success',
      access_token,
      refresh_token,
      expires_in: ACCESS_TOKEN_EXPIRES_IN, // ⭐ BẮT BUỘC
      user: {
        ...safeUser,
        roles,
      },
    };
  }

  /* ---------------------------------------------------------
     GOOGLE LOGIN SYNC
     Called by NextAuth: /auth/google-login
  --------------------------------------------------------- */
  async googleLogin(payload: { email: string; name: string; image: string }) {
    if (!payload.email) {
      throw new UnauthorizedException('Google login missing email');
    }

    let user = await this.userService.findByEmail(payload.email);

    // Nếu user chưa tồn tại → tạo mới
    if (!user) {
      user = await this.userService.create({
        email: payload.email,
        name: payload.name ?? '',
        image: payload.image ?? null,
        password: null, // Google users không cần password
        isActive: true,
      });
    }
    // Nếu user tồn tại, update name/image
    else {
      await this.userService.update(user.id, {
        name: payload.name ?? user.name,
        image: payload.image ?? user.image,
      });
    }

    const { password, refreshToken, ...safeUser } = user;
    return safeUser;
  }

  /* ---------------------------------------------------------
     REFRESH TOKEN
  --------------------------------------------------------- */
  async refresh(refreshToken: string) {
    let payload: JwtPayload;

    try {
      payload = this.jwt.verify(refreshToken);
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const user = await this.userService.findById(payload.sub);
    if (!user || !user.refreshToken) {
      throw new UnauthorizedException();
    }

    // ✅ SO SÁNH HASH
    const isValid = await bcrypt.compare(refreshToken, user.refreshToken);
    if (!isValid) throw new UnauthorizedException();

    const roleIds = user.roles?.map((r) => r.id) ?? [];

    const access_token = this.jwt.sign(
      {
        sub: user.id,
        email: user.email,
        roleIds,
      },
      { expiresIn: ACCESS_TOKEN_EXPIRES_IN },
    );

    return {
      message: 'Token refreshed',
      access_token,
      expires_in: ACCESS_TOKEN_EXPIRES_IN, // ⭐ BẮT BUỘC
    };
  }

  async logout(userId: string) {
    await this.userService.updateRefreshToken(userId, null);
    return { message: 'Logged out' };
  }

  async getMe(accessToken: string) {
    try {
      const decoded = this.jwt.verify(accessToken);

      const user = await this.userService.findById(decoded.sub);
      if (!user) throw new UnauthorizedException();

      const { password, refreshToken, ...safeUser } = user;
      return safeUser;
    } catch {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }

  async getMeById(userId: string) {
    const user = await this.userService.findById(userId);
    if (!user) throw new UnauthorizedException('User not found');

    const { password, refreshToken, ...safeUser } = user;
    return safeUser;
  }
}
