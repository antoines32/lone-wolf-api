import { Type } from 'class-transformer';
import {
  IsArray,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { User } from 'src/users/schemas/user.schema';
import { Paragraph } from '../schemas/paragraph.schema';

export class UpdateCharacterDto {
  @IsMongoId()
  @IsNotEmpty()
  _id: string;

  @Type(() => User)
  @IsNotEmpty()
  user: User;

  @IsString()
  @IsNotEmpty()
  bookName: string;

  @IsString()
  @IsNotEmpty()
  characterName: string;

  @IsNumber()
  @IsNotEmpty()
  combatSkill: number;

  @IsNumber()
  @IsNotEmpty()
  endurancePoints: number;

  @IsArray()
  kaiDisciplines: string[];

  @IsArray()
  backpack: string[];

  @IsNumber()
  @IsNotEmpty()
  beltpouch: number;

  @IsArray()
  specialItems: any[];

  @IsString()
  weapon1: string;

  @IsString()
  weapon2: string;

  @Type(() => Paragraph)
  curentParagraph: Paragraph;
}
