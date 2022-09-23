import { HttpService } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { of } from 'rxjs';
import { SendEmailInterface } from './interface/send-email.interface';
import { SendgridService } from './sendgrid.service';

describe('SendgridService', () => {
  let sendGridService: SendgridService;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SendgridService, {
          provide: HttpService,
          useValue: {
            post: jest.fn(),
          },
        }],
    }).compile();

    sendGridService = module.get<SendgridService>(SendgridService);
    httpService = module.get<HttpService>(HttpService);
  });

  it('should be defined', () => {
    expect(sendGridService).toBeDefined();
    expect(httpService).toBeDefined();
  });

  describe('sendMail', () => {
    it('should send an email with success',async () => {
      // arrange
      const data: SendEmailInterface = {
        reply_to: {
          email: 'leonardo.cintra@luizalabs.com',
          name: 'Leonardo'
        },
        personalizations: [
          {
            subject: 'Sua fatura chegou atrasada!',
            to: [
              {
                name: 'Juliana',
                email: 'juliana.ncintra@outlook.com'
              }
            ]
          }
        ],
        from: {
          email: 'leonardo.cintra@luizalabs.com',
          name: 'Leonardo'
        },
        content: [
          {
            type: 'text/html',
            value: '<p>Sua fatura chegou atrasada pague e evite multas!</p>'
          }
        ]
      }
      jest.spyOn(httpService, 'post').mockReturnValueOnce(of({status: 202, statusText: 'ACCEPTED', config: {}, headers: {}, data: ''}));

      // act
      const result = await sendGridService.sendEmail(data);
      // assert
      expect(result).toBeTruthy();
      expect(httpService.post).toBeCalledTimes(1);
    })
  });
});
