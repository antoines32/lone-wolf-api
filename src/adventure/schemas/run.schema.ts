import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type RunDocument = HydratedDocument<Run>;

@Schema()
export class Run {
  paragraphAction: string;
  @Prop({ required: true })
  labelAction: string;
  @Prop({ required: true })
  runTo: number;
}

export const RunSchema = SchemaFactory.createForClass(Run);
