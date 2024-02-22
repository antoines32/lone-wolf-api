import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CharacterController } from './controllers/character/character.controller';
import { ParagraphController } from './controllers/paragraph/paragraph.controller';
import { CharacterService } from './services/character/character.service';
import { Character, CharacterSchema } from './schemas/character.schema';
import { Paragraph, ParagraphSchema } from './schemas/paragraph.schema';
import { KaiDisciplineController } from 'src/adventure/controllers/kai-discipline/kai-discipline.controller';
import { KaiDisciplineService } from './services/kai-discipline/kai-discipline.service';
import {
  KaiDiscipline,
  KaiDisciplineSchema,
} from './schemas/kai-discipline.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Character.name, schema: CharacterSchema },
      { name: Paragraph.name, schema: ParagraphSchema },
      { name: KaiDiscipline.name, schema: KaiDisciplineSchema },
    ]),
  ],
  controllers: [
    CharacterController,
    ParagraphController,
    KaiDisciplineController,
  ],
  providers: [CharacterService, KaiDisciplineService],
})
export class AdventureModule {}
