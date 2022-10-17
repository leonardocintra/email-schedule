import { HttpService } from '@nestjs/axios';
import { HttpStatus, Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { SendEmailInterface } from './interface/send-email.interface';

@Injectable()
export class SendgridService {
    private readonly SENDGRID_API_URL = process.env.SENDGRID_API_URL;
    private readonly SENDGRID_API_TOKEN = process.env.SENDGRID_API_TOKEN;
    private readonly ESTORNO_API_URL = process.env.ESTORNO_API_URL;
    private readonly ESTORNO_API_TOKEN = process.env.ESTORNO_API_TOKEN;

    constructor(private readonly httpService: HttpService) { }

    async sendEmail(data: SendEmailInterface): Promise<boolean> {
        const url = `${this.SENDGRID_API_URL}/mail/send`;
        const config = {
            headers: {
                Authorization: `Bearer ${this.SENDGRID_API_TOKEN}`
            }
        };

        const response = await lastValueFrom(this.httpService.post(url, data, config));
        console.log(response.data);
        return response.status === HttpStatus.ACCEPTED;
    }
    
    async sendEstorno(): Promise<boolean> {
        const url = this.ESTORNO_API_URL;
        const config = {
            headers: {
                token: this.ESTORNO_API_TOKEN
            }
        };

        const response = await lastValueFrom(this.httpService.get(url, config));
        return response.status === HttpStatus.OK;
    }
}