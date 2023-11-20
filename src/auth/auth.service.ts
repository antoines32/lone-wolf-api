import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/services/users.service';
import { AuthenticateUserDto } from './dto/authenticate-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findByMailOrId(username, null);
    if (user && user.userPwd === pass) {
      const { userPwd, ...result } = user;
      return result;
    }
    return null;
  }

  async login(authUserDto: AuthenticateUserDto) {
    const foundUser = await this.usersService.findByMailOrId(
      authUserDto.userMail,
      null,
    );
    if (!foundUser) {
      throw new UnauthorizedException();
    }
    if (foundUser.userPwd !== authUserDto.userPwd) {
      throw new NotFoundException();
    }
    const payload = {
      createdAt: new Date().toISOString(),
      sub: foundUser.userName,
      role: '',
    };
    if (foundUser.userMail === 'antoine@toto.com') {
      payload.role = 'Admin';
    } else {
      payload.role = 'user';
    }
    return {
      access_token: this.jwtService.sign(payload),
    }
  }
}
