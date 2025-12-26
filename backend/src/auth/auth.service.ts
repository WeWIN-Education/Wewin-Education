/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import bcrypt from 'bcrypt';
import { Roles } from './roles.decorator';

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
      password: hashed,
      isActive: true,
    });
  }

  /* ---------------------------------------------------------
     LOGIN (CREDENTIALS)
  --------------------------------------------------------- */
  async login(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    // const user = await this.userService.findByEmailWithRoles(email);

    if (!user) throw new UnauthorizedException('User not found');
    if (!user.password) throw new UnauthorizedException('No password stored');

    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new UnauthorizedException('Wrong password');
    // JWT 15 mins
    const accessToken = this.jwt.sign(
      { id: user.id, email: user.email, roles: user.roles },
      { expiresIn: '15m' },
    );

    const refreshToken = this.jwt.sign(
      { id: user.id, email: user.email, roles: user.roles },
      { expiresIn: '30d' },
    );

    const hashed = await bcrypt.hash(refreshToken, 10);
    await this.userService.updateRefreshToken(user.id, hashed);

    const { password: _pw, refreshToken: _rt, ...safeUser } = user;

    return {
      message: 'Login success',
      access_token: accessToken,
      user: {
        ...safeUser,
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
     GENERATE TOKENS
  --------------------------------------------------------- */
  async generateAccessToken(userId: string, email: string) {
    return this.jwt.sign({ id: userId, email }, { expiresIn: '15m' });
  }

  async generateRefreshToken(userId: string, email: string) {
    return this.jwt.sign({ id: userId, email }, { expiresIn: '30d' });
  }

  /* ---------------------------------------------------------
     REFRESH TOKEN
  --------------------------------------------------------- */
  async refresh(refreshToken: string) {
    try {
      const decoded = this.jwt.verify(refreshToken);
      const user = await this.userService.findByEmail(decoded.email);

      if (!user || !user.refreshToken)
        throw new UnauthorizedException('Invalid token');

      const match = await bcrypt.compare(refreshToken, user.refreshToken);
      if (!match) throw new UnauthorizedException('Invalid refresh token');

      const newAccess = this.jwt.sign(
        { id: user.id, email: user.email },
        { expiresIn: '15m' },
      );

      return { access_token: newAccess };
    } catch (e) {
      throw new UnauthorizedException('Expired or invalid token');
    }
  }

  /* ---------------------------------------------------------
     LOGOUT
  --------------------------------------------------------- */
  async logout(userId: string) {
    await this.userService.updateRefreshToken(userId, null);
    return { message: 'Logged out' };
  }

  /* ---------------------------------------------------------
     GET ME FROM ACCESS TOKEN
     Works with: backend token & Google token
  --------------------------------------------------------- */
  async getMe(accessToken: string) {
    try {
      const decoded = this.jwt.verify(accessToken);

      const user = await this.userService.findById(decoded.id);
      if (!user) throw new UnauthorizedException('User not found');

      const { password, refreshToken, ...safeUser } = user;
      return safeUser;
    } catch (err) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }

  /* ---------------------------------------------------------
     GET USER BY ID
  --------------------------------------------------------- */
  async getMeById(userId: string) {
    const user = await this.userService.findById(userId);
    if (!user) throw new UnauthorizedException('User not found');

    const { password, refreshToken, ...safeUser } = user;
    return safeUser;
  }
}
