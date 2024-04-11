import { Controller, Post, Body } from '@nestjs/common';
import { LoginDto } from './schemas/login.dto';
import AuthService from './auth.service';
import { JwtToken } from './schemas/jwt.types';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(
    @Body() loginDto: LoginDto,
  ): Promise<{ token: JwtToken; expiresIn: string }> {
    return this.authService.login(loginDto);
  }
}
