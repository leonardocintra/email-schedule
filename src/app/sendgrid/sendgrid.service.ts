import { HttpService } from '@nestjs/axios';
import { HttpStatus, Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { SendEmailInterface } from './interface/send-email.interface';

@Injectable()
export class SendgridService {
    constructor(private readonly httpService: HttpService) { }

    async sendEmail(data: SendEmailInterface): Promise<boolean> {
        const url = 'https://api.sendgrid.com/v3/mail/send';
        const config = {
            headers: {
                Authorization: 'Bearer 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'
            }
        };

        const response = await lastValueFrom(this.httpService.post(url, data, config));
        return response.status === HttpStatus.ACCEPTED;
    }
}
