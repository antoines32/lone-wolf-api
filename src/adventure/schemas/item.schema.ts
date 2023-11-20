import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ItemDocument = HydratedDocument<Item>;

@Schema()
export class Item {
  paragraphAction: string;
  @Prop({ required: true })
  labelAction: string;
  @Prop({ required: true })
  itemName: string;
  @Prop({ required: true })
  price: number;
}

export const ItemSchema = SchemaFactory.createForClass(Item);
