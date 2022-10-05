import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { Timeout } from '@nestjs/schedule';

@Injectable()
export class MailbotService {
  constructor(private readonly httpService: HttpService) {}

  @Timeout(100)
  handleTimeout() {
    console.log('Teste');
    try {
        this.httpService.post('http://localhost:3000/api/v1/mails', {
          destinationAddress: 'user@gmail.com',
          dueDate: '2022-09-30T18:51:02.95-03:00',
          destinationName: 'Usuario Teste',
          subject: 'Teste de email',
          body: '<h1>Hi tudo nice ?</h1>',
        });
    } catch {
        console.log('Deu erro');
    }
  }
}
