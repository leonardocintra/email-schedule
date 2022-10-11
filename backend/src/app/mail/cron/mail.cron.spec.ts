import { Test, TestingModule } from '@nestjs/testing';
import { SendgridService } from '../../sendgrid/sendgrid.service';
import { MailEntity } from '../mail.entity';
import { MailService } from '../mail.service';
import { MailCron } from './mail.cron';

describe('MailCron', () => {
  let mailCron: MailCron;
  let mailService: MailService;
  let sendGridService: SendgridService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MailCron,
        {
          provide: MailService,
          useValue: {
            findAll: jest.fn(),
            updateStatus: jest.fn(),
          },
        },
        {
          provide: SendgridService,
          useValue: {
            sendEmail: jest.fn(),
          },
        },
      ],
    }).compile();

    mailService = module.get<MailService>(MailService);
    mailCron = module.get<MailCron>(MailCron);
    sendGridService = module.get<SendgridService>(SendgridService);
  });

  it('should be defined', () => {
    expect(mailService).toBeDefined();
    expect(sendGridService).toBeDefined();
    expect(mailCron).toBeDefined();
  });

  describe('handler', () => {
    it('should send mail everty 10 seconds', async () => {
      // Arrange
      const mailEntityMockList = [
        { id: '1', dueDate: '2022-04-30T18:51:02.95-03:00' },
        { id: '2', dueDate: '2022-02-30T18:51:02.95-03:00' },
      ] as MailEntity[];
      jest.spyOn(mailService, 'findAll').mockResolvedValueOnce(mailEntityMockList);
      jest.spyOn(sendGridService, 'sendEmail').mockResolvedValueOnce(true);
      jest.spyOn(mailService, 'updateStatus').mockResolvedValueOnce();
      // Act
      const result = await mailCron.handler();
      // Assert
      expect(result).toBeUndefined();
      expect(mailService.findAll).toBeCalledTimes(1);
      expect(sendGridService.sendEmail).toBeCalledTimes(2);
      expect(mailService.updateStatus).toBeCalledTimes(2);
    });
  });
});
