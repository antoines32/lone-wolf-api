import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCharacterDto } from 'src/adventure/dto/create-character-dto';
import { UpdateCharacterDto } from 'src/adventure/dto/update-character-dto';
import { Character } from 'src/adventure/schemas/character.schema';
import { Paragraph } from 'src/adventure/schemas/paragraph.schema';
import { User } from 'src/users/schemas/user.schema';

@Injectable()
export class CharacterService {
  constructor(
    @InjectModel(Character.name) private charModel: Model<Character>,
    @InjectModel(Paragraph.name) private paraModel: Model<Paragraph>,
  ) {}

  async create(createCharDto: CreateCharacterDto) {
    return this.charModel.create(createCharDto);
  }

  async findById(id: string) {
    return this.charModel.findById(id).exec();
  }

  async findByUserId(userId: string) {
    return this.charModel
      .find({ user: userId })
      .select(['-user', '-__v'])
      .exec();
  }

  async delete(id: string) {
    return this.charModel.findByIdAndDelete(id).exec();
  }

  async getnextParagraphAndUpdateCharacter(
    idChara: string,
    characterDto: UpdateCharacterDto,
    paragraphNumber: number,
  ) {
    characterDto.currentParagraph = await this.getParagraphByNumberAndBook(
      paragraphNumber,
      characterDto.bookName,
    );
    const updatedCharacter = await this.charModel
      .findOneAndReplace({ _id: idChara }, characterDto, { new: true })
      .populate('currentParagraph')
      .exec();
    if (!updatedCharacter) {
      throw new NotFoundException(`Character not found`);
    }
    return updatedCharacter;
  }

  async getParagraphByNumberAndBook(paragraphNumber: number, bookName: string) {
    const para = await this.paraModel
      .findOne({ paragraphNumber: paragraphNumber, bookName: bookName })
      .exec();
    console.log(para);
    if (!para) {
      throw new NotFoundException(
        `paragraph ${paragraphNumber} from book ${bookName} not found !`,
      );
    }
    return para;
  }
}
