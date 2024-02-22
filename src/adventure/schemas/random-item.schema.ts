import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type RandomItemDocument = HydratedDocument<RandomItem>;

@Schema()
export class RandomItem {

  @Prop({ required: true })
  bookName: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  diceNumber: number;
}

export const RandomItemSchema = SchemaFactory.createForClass(RandomItem);