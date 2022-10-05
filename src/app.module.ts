import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './configs/TypeOrmModuleOptions';
import { SendgridModule } from './app/sendgrid/sendgrid.module';
import { MailModule } from './app/mail/mail.module';
import { MailbotService } from './cronzinho/mailbot/mailbot.service';
import { ScheduleModule } from '@nestjs/schedule';
import { MailbotModule } from './cronzinho/mailbot/mailbot.module';
@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(typeOrmConfig),
    ScheduleModule.forRoot(),
    SendgridModule,
    MailModule,
    MailbotModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
