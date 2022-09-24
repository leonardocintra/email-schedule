import { Body, Controller, Post } from '@nestjs/common';
import { SendgridService } from './sendgrid.service';

@Controller('api/v1/sendgrid')
export class SendgridController {
    constructor(private readonly sendGridService: SendgridService) { }
    @Post()
    sendEmail(@Body() body) {
        console.log('ronaldoooo');
        return this.sendGridService.sendEmail(body);
    }
}
