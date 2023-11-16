import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type EnnemyDocument = HydratedDocument<Ennemy>;

export class Ennemy {
  @Prop({ required: true })
  ennemyName: string;
  @Prop({ required: true })
  combatSkill: number;
  @Prop({ required: true })
  endurancePoints: number;
  @Prop()
  specialEffect: string;
}

export const EnnemySchema = SchemaFactory.createForClass(Ennemy);
