import { IsNotEmpty } from "class-validator";

export class CreateCharacterDto {
  @IsNotEmpty()
  user: string;

  
  bookName: string;
  characterName: string;
  combatSkill: number;
  endurancePoints: number;
  kaiDisciplines: string[];
  backpack: string[];
  beltpouch: number;
  specialItems: any[];
  weapon1: string;
  weapon2: string;
}