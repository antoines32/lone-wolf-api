import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { roleConstants } from 'src/constants/roles.const';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserDto } from '../dto/user-dto';
import { User } from '../schemas/user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(userDto: UserDto): Promise<User> {
    const clone = { role: roleConstants.user, ...userDto };
    clone.userPwd = await this.encrypt(userDto.userPwd);
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

  async update(mail: string, user: UpdateUserDto): Promise<User> {
    if (user.userPwd) {
      user.userPwd = await this.encrypt(user.userPwd);
    }
    const updatedUser = await this.userModel
      .findOneAndUpdate({ userMail: mail }, user, { new: true })
      .select('-__v')
      .exec();
    if (!updatedUser) {
      throw new NotFoundException(`User ${mail} not found`);
    }
    return updatedUser;
  }

  private async encrypt(userPwd: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(userPwd, salt);
  }
}
