import { Controller, Get, Query } from '@nestjs/common';
import { CloudinaryService } from './cloudinary.service';

@Controller('cloudinary')
export class CloudinaryController {
  constructor(private readonly cloudinaryService: CloudinaryService) {}

  @Get('signature')
  getSignature(@Query('folder') folder?: string) {
    return this.cloudinaryService.signUpload({ folder });
  }
}
