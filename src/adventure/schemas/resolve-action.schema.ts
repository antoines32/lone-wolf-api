import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ResolveActionDocument = HydratedDocument<ResolveAction>;

@Schema()
export class ResolveAction {
  @Prop({ required: true })
  labelAction: string;
  @Prop({ required: true })
  success: number;
  @Prop({ required: true })
  fail: number;
  @Prop({ required: true })
  runToSuccess: number;
  @Prop({ required: true })
  runToFail: number;
}

export const ResolveActionSchema = SchemaFactory.createForClass(ResolveAction);
