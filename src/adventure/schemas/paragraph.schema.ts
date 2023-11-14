import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ParagraphDocument = HydratedDocument<Paragraph>;

@Schema()
export class Paragraph {
  @Prop()
  paragraphNumber: number;
  @Prop()
  bookName: string;
}

export const ParagraphSchema = SchemaFactory.createForClass(Paragraph);
