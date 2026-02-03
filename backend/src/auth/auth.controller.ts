import {
  Controller,
  Get,
  Post,
  Body,
  Req,
  UseGuards,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { JwtAuthGuard } from './jwt-auth.guard';

/* ===== REQUEST CÓ USER TỪ ACCESS TOKEN ===== */
interface AuthenticatedRequest extends Request {
  user: {
    sub: string;
    email: string;
    roleIds?: string[];
  };
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /* ---------------------------------------------------------
     REGISTER
  --------------------------------------------------------- */
  @Post('register')
  register(@Body() data: RegisterDto) {
    return this.authService.register(data);
  }

  /* ---------------------------------------------------------
     LOGIN (Credentials)
     → trả access_token + refresh_token + expires_in
  --------------------------------------------------------- */
  @Post('login')
  async login(@Body() data: LoginDto) {
    return this.authService.login(data.email, data.password);
  }

  /* ---------------------------------------------------------
     REFRESH TOKEN
     ❗ KHÔNG DÙNG JwtAuthGuard / JwtRefreshGuard
     → verify refresh token thủ công trong service
  --------------------------------------------------------- */
  @Post('refresh')
  async refresh(@Body('refreshToken') refreshToken: string) {
    if (!refreshToken) {
      throw new UnauthorizedException('Missing refresh token');
    }
    return this.authService.refresh(refreshToken);
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  logout(@Req() req: AuthenticatedRequest) {
    return this.authService.logout(req.user.sub);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getMe(@Req() req: AuthenticatedRequest) {
    return this.authService.getMeById(req.user.sub);
  }
}
