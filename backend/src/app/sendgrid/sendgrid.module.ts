import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { SendgridService } from './sendgrid.service';
import { SendgridController } from './sendgrid.controller';

@Module({
  imports: [HttpModule],
  providers: [SendgridService],
  controllers: [SendgridController],
  exports: [SendgridService],
})
export class SendgridModule {}
