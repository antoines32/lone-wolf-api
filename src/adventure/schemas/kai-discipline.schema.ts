import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type KaiDisciplineDocument = HydratedDocument<KaiDiscipline>;

@Schema()
export class KaiDiscipline {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;
}

export const KaiDisciplineSchema = SchemaFactory.createForClass(KaiDiscipline);
