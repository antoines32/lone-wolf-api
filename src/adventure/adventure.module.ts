import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CharacterController } from './controllers/character/character.controller';
import { ParagraphController } from './controllers/paragraph/paragraph.controller';
import { CharacterService } from './services/character/character.service';
import { Character, CharacterSchema } from './schemas/character.schema';
import { Paragraph, ParagraphSchema } from './schemas/paragraph.schema';
import { Run, RunSchema } from './schemas/run.schema';
import { Ennemy, EnnemySchema } from './schemas/ennemy.schema';
import { Item, ItemSchema } from './schemas/item.schema';
import {
  ResolveAction,
  ResolveActionSchema,
} from './schemas/resolve-action.schema';
import { UseKai, UseKaiSchema } from './schemas/use-kai.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Character.name, schema: CharacterSchema },
      {
        name: Paragraph.name,
        schema: ParagraphSchema,
        discriminators: [
          { name: Run.name, schema: RunSchema },
          { name: Ennemy.name, schema: EnnemySchema },
          { name: Item.name, schema: ItemSchema },
          { name: ResolveAction.name, schema: ResolveActionSchema },
          { name: UseKai.name, schema: UseKaiSchema },
        ],
      },
    ]),
  ],
  controllers: [CharacterController, ParagraphController],
  providers: [CharacterService],
})
export class AdventureModule {}
