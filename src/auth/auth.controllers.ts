import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<string> {
    const { number, password } = loginDto;

    const workerLogin = await this.authService.validateLogin(number, password);

    if (!workerLogin) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    return workerLogin;
  }
}
