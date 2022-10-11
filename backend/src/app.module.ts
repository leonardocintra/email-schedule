import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './configs/TypeOrmModuleOptions';
import { SendgridModule } from './app/sendgrid/sendgrid.module';
import { MailModule } from './app/mail/mail.module';
import { ScheduleModule } from '@nestjs/schedule';
@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(typeOrmConfig),
    ScheduleModule.forRoot(),
    SendgridModule,
    MailModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
