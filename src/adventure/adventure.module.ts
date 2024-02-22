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
import { RandomItem, RandomItemSchema } from './schemas/random-item.schema';
import { ItemService } from './services/item/item.service';
import { ItemController } from './controllers/item/item.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Character.name, schema: CharacterSchema },
      { name: Paragraph.name, schema: ParagraphSchema },
      { name: KaiDiscipline.name, schema: KaiDisciplineSchema },
      { name: RandomItem.name, schema: RandomItemSchema }
    ]),
  ],
  controllers: [
    CharacterController,
    ParagraphController,
    KaiDisciplineController,
    ItemController,
  ],
  providers: [CharacterService, KaiDisciplineService, ItemService],
})
export class AdventureModule { }
