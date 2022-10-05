import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { MailbotService } from './mailbot.service';

@Module({
  imports: [HttpModule],
  providers: [MailbotService],
})
export class MailbotModule {}
