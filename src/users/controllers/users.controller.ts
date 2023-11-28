import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { roleConstants } from 'src/constants/roles.const';
import { Roles } from 'src/custom-decorators/roles.decorator';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserDto } from '../dto/user-dto';
import { User } from '../schemas/user.schema';
import { UsersService } from '../services/users.service';

@Controller('users')
@UseGuards(RolesGuard)
export class UsersController {
  constructor(private userService: UsersService) {}

  @UseGuards(AuthGuard('jwt'))
  @Roles([roleConstants.admin])
  @Get()
  async findAllUsers(
    @Res({ passthrough: true }) res: Response,
  ): Promise<User[]> {
    try {
      return this.userService.findAll();
    } catch (err) {
      res.status(err.response.statusCode).send(err.response);
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('user')
  async findByMailOrId(
    @Query('mail') mail: string,
    @Query('id') id: string,
    @Res({ passthrough: true }) res: Response,
  ): Promise<User> {
    try {
      return this.userService.findByMailOrId(mail, id);
    } catch (err) {
      res.send(err.response);
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async findById(
    @Param('id') id: string,
    @Res({ passthrough: true }) res: Response,
  ): Promise<User> {
    try {
      return this.userService.findOne(id);
    } catch (err) {
      res.status(err.response.statusCode).send(err.response);
    }
  }

  @Post()
  async createUser(
    @Body() userDto: UserDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<User> {
    try {
      return this.userService.create(userDto);
    } catch (err) {
      res.status(err.response.statusCode).send(err.response);
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':mail')
  async updateUser(
    @Param('mail') mail: string,
    @Body() body: UpdateUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    try {
      return this.userService.update(mail, body);
    } catch (err) {
      res.send(err.response);
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Roles([roleConstants.admin])
  @Delete(':id')
  async deleteUser(
    @Param('id') id: string,
    @Res({ passthrough: true }) res: Response,
  ): Promise<User> {
    try {
      return this.userService.remove(id);
    } catch (err) {
      res.status(err.response.statusCode).send(err.response);
    }
  }
}
