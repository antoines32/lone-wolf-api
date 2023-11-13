import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCharacterDto } from 'src/adventure/dto/create-character-dto';
import { Character } from 'src/adventure/schemas/character.schema';

@Injectable()
export class CharacterService {

  constructor(@InjectModel(Character.name) private charModel: Model<Character>) {}

  async create(createCharDto: CreateCharacterDto) {
    return this.charModel.create(createCharDto);
  }

  async findById(id: string) {
    return this.charModel.findById(id).exec();
  }

}
