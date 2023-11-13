import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Mongoose } from 'mongoose';
import { User } from 'src/users/schemas/user.schema';
import { Paragraph } from './paragraph.schema';

export type CharacterDocument = HydratedDocument<Character>;

@Schema()
export class Character {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;
  @Prop()
  bookName: string;
  @Prop()
  characterName: string;
  @Prop()
  combatSkill: number;
  @Prop()
  endurancePoints: number;
  @Prop([String])
  kaiDisciplines: string[];
  @Prop([String])
  backpack: string[];
  @Prop()
  beltpouch: number;
  @Prop({ type: [{ type: { name: String, effect: String } }] })
  specialItems;
  @Prop()
  weapon1: string;
  @Prop()
  weapon2: string;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Paragraph' })
  curentParagraph: Paragraph;
}

export const CharacterSchema = SchemaFactory.createForClass(Character);
