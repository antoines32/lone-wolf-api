import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RandomItem } from 'src/adventure/schemas/random-item.schema';

@Injectable()
export class ItemService {
  constructor(@InjectModel(RandomItem.name) private randomItemModel: Model<RandomItem>) { }

  async findByBookName(bookName: string) {
    return this.randomItemModel.find({ bookName: bookName }).select('-v__').exec();
  }

  async create(item: RandomItem) {
    return this.randomItemModel.create(item);
  }
}
