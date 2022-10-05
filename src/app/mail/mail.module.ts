import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailEntity } from './mail.entity';
import { MailService } from './mail.service';

@Module({
  imports: [TypeOrmModule.forFeature([MailEntity])],
  providers: [MailService]
})
export class MailModule {}
