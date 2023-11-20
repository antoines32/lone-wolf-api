import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Ennemy } from './ennemy.schema';
import { Item } from './item.schema';
import { ResolveAction } from './resolve-action.schema';
import { Run } from './run.schema';
import { UseKai } from './use-kai.schema';

export type ParagraphDocument = HydratedDocument<Paragraph>;

@Schema({ discriminatorKey: 'paragraphAction' })
export class Paragraph {
  @Prop({ required: true })
  paragraphNumber: number;

  @Prop({ required: true })
  bookName: string;

  @Prop({ type: [String], required: true })
  bodyText: string[];

  @Prop({
    type: String,
    enum: [Run.name, UseKai.name, ResolveAction.name, Ennemy.name, Item.name],
  })
  paragraphAction: string;

  // @Prop({ type: [Run] })
  // runs: Run[];

  // @Prop({ type: [UseKai] })
  // useKais: UseKai[];

  // @Prop({ type: ResolveAction })
  // resolve: ResolveAction;

  // @Prop({ type: [Ennemy] })
  // ennemies: Ennemy[];

  // @Prop({ type: [Item] })
  // items: Item[];
}

export const ParagraphSchema = SchemaFactory.createForClass(Paragraph);
