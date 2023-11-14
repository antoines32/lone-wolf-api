import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsNotEmptyObject,
  IsNumber,
  IsString,
} from 'class-validator';
import { User } from 'src/users/schemas/user.schema';

export class CreateCharacterDto {
  @IsNotEmptyObject()
  @Type(() => User)
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
  beltpouch: number;

  @IsArray()
  specialItems: any[];

  @IsString()
  @IsNotEmpty()
  weapon1: string;

  @IsString()
  @IsNotEmpty()
  weapon2: string;
}
