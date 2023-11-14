import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Character } from 'src/adventure/schemas/character.schema';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: true })
  userName: string;
  @Prop({ required: true })
  userMail: string;
  @Prop({ required: true })
  userPwd: string;
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Character' }] })
  characters: Character[];
}

export const UserSchema = SchemaFactory.createForClass(User);
