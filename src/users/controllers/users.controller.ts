import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { UserDto } from '../dto/user-dto';
import { User } from '../schemas/user.schema';
import { UsersService } from '../services/users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}
  @Get()
  async findAllUsers(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string): Promise<User> {
    return this.userService.findOne(id);
  }

  @Post()
  async createUser(
    @Body() userDto: UserDto,
    @Res() res: Response,
  ): Promise<UserDto> {
    try {
      await this.userService.create(userDto);
      return userDto;
    } catch (err) {
      console.error(err);
      res
        .status(HttpStatus.BAD_REQUEST)
        .send({ status: 'fail', message: `${err.message}` });
    }
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string, @Res() res: Response) {
    await this.userService.remove(id);
    res.status(HttpStatus.OK).send({
      status: 'success',
      message: `user with id ${id} successfully deleted`,
    });
  }
}
