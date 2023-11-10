import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDto } from '../dto/user-dto';
import { User } from '../schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(userDto: UserDto): Promise<User> {
    const createdUser = this.userModel.create(userDto);
    return createdUser;
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().select(['-__v']).exec();
  }

  async findOne(id: string): Promise<User> {
    return this.userModel.findById(id).select('-__v').exec();
  }

  async remove(id: string) {
    this.userModel.findByIdAndDelete(id).exec();
  }
}
