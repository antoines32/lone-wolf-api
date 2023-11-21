import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type RunDocument = HydratedDocument<Run>;

export class Run {
  @Prop({ required: true })
  labelAction: string;
  @Prop({ required: true })
  runTo: number;
}

export const RunSchema = SchemaFactory.createForClass(Run);
