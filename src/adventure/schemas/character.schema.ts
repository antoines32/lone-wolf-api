import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Mongoose } from 'mongoose';
import { User } from 'src/users/schemas/user.schema';
import { Paragraph } from './paragraph.schema';

export type CharacterDocument = HydratedDocument<Character>;

@Schema()
export class Character {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;

  @Prop({ required: true })
  bookName: string;

  @Prop({ required: true })
  characterName: string;

  @Prop({ required: true })
  combatSkill: number;

  @Prop({ required: true })
  endurancePoints: number;

  @Prop([String])
  kaiDisciplines: string[];

  @Prop([String])
  backpack: string[];

  @Prop({ default: 0 })
  beltpouch: number;

  @Prop({ type: [{ type: { name: String, effect: String } }] })
  specialItems;

  @Prop()
  weapon1: string;

  @Prop()
  weapon2: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Paragraph',
    default: '6554d51823094d3cd7291663',
  })
  currentParagraph: Paragraph;
}

export const CharacterSchema = SchemaFactory.createForClass(Character);
