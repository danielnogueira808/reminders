import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Logger,
} from '@nestjs/common';
import { RemindersService } from './reminders.service';
import { CreateReminderDto } from './dto/create-reminder.dto';
import { UpdateReminderDto } from './dto/update-reminder.dto';

@Controller('reminders')
export class RemindersController {
  private readonly logger = new Logger(RemindersController.name);

  constructor(private readonly remindersService: RemindersService) {}

  @Post()
  create(@Body() createReminderDto: CreateReminderDto) {
    this.logger.log(
      `Creating new reminder: ${JSON.stringify(createReminderDto)}`,
    );
    return this.remindersService.create(createReminderDto);
  }

  @Get()
  findAll() {
    this.logger.log('Fetching all reminders');
    return this.remindersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    this.logger.log(`Fetching reminder with ID: ${id}`);
    return this.remindersService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateReminderDto: UpdateReminderDto,
  ) {
    this.logger.log(
      `Updating reminder ${id} with data: ${JSON.stringify(updateReminderDto)}`,
    );
    return this.remindersService.update(id, updateReminderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    this.logger.log(`Removing reminder with ID: ${id}`);
    return this.remindersService.remove(id);
  }
}
