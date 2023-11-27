import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthenticateUserDto } from './dto/authenticate-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('login')
  async authenticate(@Body() authUser: AuthenticateUserDto) {
    return await this.authService.login(authUser);
  }
}
