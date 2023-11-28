import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Transform } from 'class-transformer';
import mongoose, { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: true })
  userName: string;
  @Prop({ required: true, unique: true })
  userMail: string;
  @Prop({ required: true })
  userPwd: string;
  @Prop()
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
