import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateReminderDto } from './dto/create-reminder.dto';
import { UpdateReminderDto } from './dto/update-reminder.dto';
import { Reminder, ReminderDocument } from './schemas/reminder.schema';

@Injectable()
export class RemindersService {
  constructor(@InjectModel(Reminder.name) private reminderModel: Model<ReminderDocument>) {}

  async create(createReminderDto: CreateReminderDto): Promise<Reminder> {
    const createdReminder = new this.reminderModel(createReminderDto);
    return createdReminder.save();
  }

  async findAll(): Promise<Reminder[]> {
    return this.reminderModel.find().exec();
  }

  async findOne(id: string): Promise<Reminder> {
    const reminder = await this.reminderModel.findById(id).exec();
    return this.handleNotFound(reminder);
  }

  async update(id: string, updateReminderDto: UpdateReminderDto): Promise<Reminder> {
    const updatedReminder = await this.reminderModel.findByIdAndUpdate(id, updateReminderDto, { new: true }).exec();
    return this.handleNotFound(updatedReminder);
  }

  async remove(id: string): Promise<Reminder> {
    const deletedReminder = await this.reminderModel.findByIdAndDelete(id).exec();
    return this.handleNotFound(deletedReminder);
  }

  private handleNotFound(reminder: Reminder | null): Reminder {
    if (!reminder) {
      throw new HttpException('Reminder not found', HttpStatus.NOT_FOUND);
    }
    return reminder;
  }
}
