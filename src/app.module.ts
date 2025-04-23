import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RemindersModule } from './reminders/reminders.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/reminders'),
    RemindersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
