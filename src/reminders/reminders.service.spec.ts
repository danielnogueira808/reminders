import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { RemindersService } from './reminders.service';
import { Reminder } from './schemas/reminder.schema';
import { HttpException, HttpStatus } from '@nestjs/common';

describe('RemindersService', () => {
  let service: RemindersService;

  const mockReminder = {
    _id: 'test-id',
    title: 'Test Reminder',
    description: 'Test Description',
    date: new Date(),
  };

  const mockReminderModel = {
    new: jest.fn().mockResolvedValue(mockReminder),
    constructor: jest.fn().mockResolvedValue(mockReminder),
    find: jest.fn(),
    findById: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn(),
    save: jest.fn(),
    exec: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RemindersService,
        {
          provide: getModelToken(Reminder.name),
          useValue: mockReminderModel,
        },
      ],
    }).compile();

    service = module.get<RemindersService>(RemindersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it.skip('should create a reminder', async () => {
      const createReminderDto = {
        title: 'Test Reminder',
        description: 'Test Description',
        date: new Date(),
      };

      jest.spyOn(mockReminderModel, 'save').mockResolvedValueOnce(mockReminder);

      const result = await service.create(createReminderDto);
      expect(result).toEqual(mockReminder);
    });
  });

  describe('findAll', () => {
    it('should return an array of reminders', async () => {
      const reminders = [mockReminder];
      jest.spyOn(mockReminderModel, 'find').mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce(reminders),
      } as any);

      const result = await service.findAll();
      expect(result).toEqual(reminders);
    });
  });

  describe('findOne', () => {
    it('should return a single reminder', async () => {
      jest.spyOn(mockReminderModel, 'findById').mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce(mockReminder),
      } as any);

      const result = await service.findOne('test-id');
      expect(result).toEqual(mockReminder);
    });

    it('should throw an error if reminder is not found', async () => {
      jest.spyOn(mockReminderModel, 'findById').mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce(null),
      } as any);

      await expect(service.findOne('test-id')).rejects.toThrow(
        new HttpException('Reminder not found', HttpStatus.NOT_FOUND),
      );
    });
  });

  describe('update', () => {
    it('should update a reminder', async () => {
      const updateReminderDto = {
        title: 'Updated Reminder',
      };

      const updatedReminder = { ...mockReminder, ...updateReminderDto };

      jest.spyOn(mockReminderModel, 'findByIdAndUpdate').mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce(updatedReminder),
      } as any);

      const result = await service.update('test-id', updateReminderDto);
      expect(result).toEqual(updatedReminder);
    });

    it('should throw an error if reminder to update is not found', async () => {
      jest.spyOn(mockReminderModel, 'findByIdAndUpdate').mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce(null),
      } as any);

      await expect(
        service.update('test-id', { title: 'Updated Reminder' }),
      ).rejects.toThrow(
        new HttpException('Reminder not found', HttpStatus.NOT_FOUND),
      );
    });
  });

  describe('remove', () => {
    it('should remove a reminder', async () => {
      jest.spyOn(mockReminderModel, 'findByIdAndDelete').mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce(mockReminder),
      } as any);

      const result = await service.remove('test-id');
      expect(result).toEqual(mockReminder);
    });

    it('should throw an error if reminder to remove is not found', async () => {
      jest.spyOn(mockReminderModel, 'findByIdAndDelete').mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce(null),
      } as any);

      await expect(service.remove('test-id')).rejects.toThrow(
        new HttpException('Reminder not found', HttpStatus.NOT_FOUND),
      );
    });
  });
});
