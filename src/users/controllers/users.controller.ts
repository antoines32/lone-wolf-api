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
  findById(@Param('id') id: string, @Res() res: Response): Promise<User> {
    try {
      return this.userService.findOne(id);
    } catch (err) {
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send({ status: 'fail', message: err });
    }
  }

  @Post()
  async createUser(
    @Body() userDto: UserDto,
    @Res() res: Response,
  ): Promise<Response<User>> {
    try {
      const createdUser = await this.userService.create(userDto);
      return res
        .status(HttpStatus.CREATED)
        .send({ status: 'success', data: createdUser });
    } catch (err) {
      console.error(err);
      res
        .status(HttpStatus.BAD_REQUEST)
        .send({ status: 'fail', message: `${err.message}` });
    }
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string, @Res() res: Response) {
    try {
      const deletedUser = await this.userService.remove(id);
      if (deletedUser) {
        res.status(HttpStatus.OK).send({
          status: 'success',
          data: deletedUser,
        });
      } else {
        res.status(HttpStatus.NOT_FOUND).send({
          status: 'fail',
          message: `user with id ${id} doesn't exist`,
        });
      }
    } catch (err) {
      res
        .status(HttpStatus.NOT_FOUND)
        .send({ status: 'fail', message: err.message });
    }
  }
}
