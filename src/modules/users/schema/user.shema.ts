import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ type: String, required: true, unique: true })
  email: string;

  @Prop({ type: String, required: true })
  userName: string;

  @Prop({ type: String, required: true })
  password: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
