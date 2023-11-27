import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ type: mongoose.Types.ObjectId })
  _id: string;
  @Prop({ required: true })
  userName: string;
  @Prop({ required: true })
  userMail: string;
  @Prop({ required: true })
  userPwd: string;
  @Prop()
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
