import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/services/users.service';
import { AuthenticateUserDto } from './dto/authenticate-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) { }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findByMailOrId(username, null);
    if (user) {
      if (this.compareHash(pass, user.userPwd)) {
        const { userPwd, ...result } = user;
        return result;
      }
    }
    return null;
  }

  async login(authUserDto: AuthenticateUserDto) {
    const foundUser = await this.usersService.findByMailOrId(
      authUserDto.userMail,
      null,
    );
    if (!foundUser) {
      throw new UnauthorizedException('Bad credential');
    }
    const isPwdValid = await this.compareHash(
      authUserDto.userPwd,
      foundUser.userPwd,
    );
    if (!isPwdValid) {
      throw new UnauthorizedException('Bad credential');
    }
    const payload = {
      createdAt: new Date().toISOString(),
      sub: {
        userMail: foundUser.userMail,
        userName: foundUser.userName,
        userRole: foundUser.role,
      },
    };
    return {
      access_token: this.jwtService.sign(payload),
      authenticated_user: {
        userMail: foundUser.userMail,
        userName: foundUser.userName,
        userRole: foundUser.role,
      }
    };
  }

  private async compareHash(passwordDto, hashedPassword): Promise<boolean> {
    return bcrypt.compare(passwordDto, hashedPassword);
  }
}
