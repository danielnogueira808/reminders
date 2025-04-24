import { IsNotEmpty, IsString, IsEnum, IsBoolean, IsOptional, IsDateString } from 'class-validator';
import { ReminderRecurring, ReminderType } from '../schemas/reminder.schema';

export class CreateReminderDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNotEmpty()
  @IsDateString()
  date: Date;

  @IsNotEmpty()
  @IsEnum(ReminderType)
  type: ReminderType;

  @IsOptional()
  @IsEnum(ReminderRecurring)
  recurring?: ReminderRecurring;

  @IsOptional()
  @IsBoolean()
  completed?: boolean;
}
