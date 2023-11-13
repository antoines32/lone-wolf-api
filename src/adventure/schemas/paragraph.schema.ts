import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type ParagraphDocument = HydratedDocument<Paragraph>;

@Schema()
export class Paragraph {
  @Prop()
  paragraphNumber: number;
}

export const ParagraphSchema = SchemaFactory.createForClass(Paragraph);