import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ReminderDocument = Reminder & Document;

@Schema()
export class Reminder {
  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop({ required: true })
  date: Date;

  @Prop({ default: 'medium' })
  priority: string;

  @Prop({ default: false })
  completed: boolean;
}

export const ReminderSchema = SchemaFactory.createForClass(Reminder);
