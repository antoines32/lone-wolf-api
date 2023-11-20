import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UseKaiDocument = HydratedDocument<UseKai>;

@Schema()
export class UseKai {
  paragraphAction: string;
  @Prop({ required: true })
  labelAction: string;
  @Prop({ required: true })
  kaiSkill: string;
  @Prop({ required: true })
  runTo: number;
}

export const UseKaiSchema = SchemaFactory.createForClass(UseKai);
