import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ReminderDocument = Reminder & Document;

export enum ReminderRecurring {
  Single = 1,
  Daily,
  Weekly,
  Monthly,
  Yearly,
}

export enum ReminderType {
  Reminder = 1,
  Bill,
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

  @Prop({ default: ReminderRecurring.Single })
  recurring: ReminderRecurring;

  @Prop({ default: false })
  completed: boolean;
}

export const ReminderSchema = SchemaFactory.createForClass(Reminder);
