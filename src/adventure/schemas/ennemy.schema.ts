import { Prop, SchemaFactory, raw, Schema } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type EnnemyDocument = HydratedDocument<Ennemy>;

@Schema()
export class Ennemy {
  paragraphAction: string;
  @Prop({ required: true })
  ennemyName: string;
  @Prop({ required: true })
  combatSkill: number;
  @Prop({ required: true })
  endurancePoints: number;
  @Prop(
    raw({
      cs: { type: Number },
      ep: { type: Number },
      avoidKai: { type: String },
    }),
  )
  specialEffect: Record<string, any>;
}

export const EnnemySchema = SchemaFactory.createForClass(Ennemy);
