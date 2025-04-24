import { Module, ValidationPipe } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RemindersModule } from './reminders/reminders.module';
import { APP_PIPE } from '@nestjs/core/constants';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:27017/reminders'), RemindersModule],
  controllers: [AppController],
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    },
    AppService,
  ],
})
export class AppModule {}
