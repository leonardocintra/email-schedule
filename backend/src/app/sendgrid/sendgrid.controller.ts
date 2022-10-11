import { Body, Controller, Post } from '@nestjs/common';
import { SendgridService } from './sendgrid.service';

@Controller('api/v1/sendgrid')
export class SendgridController {
  constructor(private readonly sendGridService: SendgridService) {}

  @Post()
  async sendEmail(@Body() body) {
    return this.sendGridService.sendEmail(body);
  }
}
