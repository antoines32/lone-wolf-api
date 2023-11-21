import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CharacterController } from './controllers/character/character.controller';
import { ParagraphController } from './controllers/paragraph/paragraph.controller';
import { CharacterService } from './services/character/character.service';
import { Character, CharacterSchema } from './schemas/character.schema';
import { Paragraph, ParagraphSchema } from './schemas/paragraph.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Character.name, schema: CharacterSchema },
      { name: Paragraph.name, schema: ParagraphSchema },
    ]),
  ],
  controllers: [CharacterController, ParagraphController],
  providers: [CharacterService],
})
export class AdventureModule {}
