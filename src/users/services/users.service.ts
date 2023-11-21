import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { roleConstants } from 'src/constants/roles.const';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserDto } from '../dto/user-dto';
import { User } from '../schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(userDto: UserDto): Promise<User> {
    const clone = { role: roleConstants.user, ...userDto };
    const createdUser = this.userModel.create(clone);
    return createdUser;
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().select(['-__v']).exec();
  }

  async findByMailOrId(mail: string, id: string): Promise<User> {
    const filter = mail ? { userMail: mail } : { _id: id };
    return this.userModel.findOne(filter).select('-__v').exec();
  }

  async findOne(id: string): Promise<User> {
    return this.userModel.findById(id).select('-__v').exec();
  }

  async remove(id: string): Promise<User> {
    const deletedUser = await this.userModel.findByIdAndDelete(id).exec();
    if (!deletedUser) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return deletedUser;
  }

  async update(id: string, user: UpdateUserDto): Promise<User> {
    const updatedUser = await this.userModel
      .findByIdAndUpdate(id, user, { new: true })
      .select('-__v')
      .exec();
    if (!updatedUser) {
      throw new NotFoundException(`User ${id} not found`);
    }
    return updatedUser;
  }
}
