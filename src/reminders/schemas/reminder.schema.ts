import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ReminderDocument = Reminder & Document;

export enum ReminderType {
  Daily,
  Weekly,
  Monthly,
  Yearly,
}

@Schema()
export class Reminder {
  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop({ required: true })
  date: Date;

  @Prop({ required: true })
  type: ReminderType;

  @Prop({ default: false })
  recurring: boolean;

  @Prop({ default: false })
  completed: boolean;
}

export const ReminderSchema = SchemaFactory.createForClass(Reminder);
