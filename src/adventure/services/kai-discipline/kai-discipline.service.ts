import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { KaiDiscipline } from 'src/adventure/schemas/kai-discipline.schema';

@Injectable()
export class KaiDisciplineService {
  constructor(
    @InjectModel(KaiDiscipline.name)
    private kaiDisciplineModel: Model<KaiDiscipline>,
  ) {}

  async findAll(): Promise<KaiDiscipline[]> {
    return this.kaiDisciplineModel.find().select(['-__v']).exec();
  }

  async create(kai: KaiDiscipline): Promise<KaiDiscipline> {
    return this.kaiDisciplineModel.create(kai);
  }
}
