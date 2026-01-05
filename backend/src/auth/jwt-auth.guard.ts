import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

/* ===== JWT PAYLOAD ===== */
interface JwtPayload {
  sub: string;
  email: string;
  roles?: string[];
  iat?: number;
  exp?: number;
}

/* ===== REQUEST WITH USER ===== */
interface AuthenticatedRequest extends Request {
  user: JwtPayload;
}

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwt: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest<AuthenticatedRequest>();

    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedException('Missing token');
    }

    const token = authHeader.replace(/^Bearer\s+/i, '');

    try {
      const decoded = this.jwt.verify<JwtPayload>(token);
      req.user = decoded;

      return true;
    } catch {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
