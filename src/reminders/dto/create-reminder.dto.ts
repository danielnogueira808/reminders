export class CreateReminderDto {
  title: string;
  description: string;
  date: Date;
  priority?: string;
  completed?: boolean;
}