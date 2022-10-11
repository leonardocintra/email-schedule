import { Test, TestingModule } from '@nestjs/testing';
import { SaveMailDto } from './dto/save-mail.dto';
import { MailController } from './mail.controller';
import { MailEntity } from './mail.entity';
import { MailService } from './mail.service';

describe('MailController', () => {
  let mailControler: MailController;
  let mailService: MailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MailController],
      providers: [
        {
          provide: MailService,
          useValue: {
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    mailControler = module.get<MailController>(MailController);
    mailService = module.get<MailService>(MailService);
  });

  it('should be defined', () => {
    expect(mailControler).toBeDefined();
    expect(mailService).toBeDefined();
  });

  describe('save', () => {
    it('should save a new mail with success', async () => {
      // Arrange
      const body: SaveMailDto = {
        destinationAddress: 'user@gmail.com',
        dueDate: '2022-09-30T18:51:02.95-03:00',
        destinationName: 'Usuario Teste',
        subject: 'Teste de email',
        body: '<h1>Hi tudo nice ?</h1>',
      };
      const mailEntityMock = { ...body } as MailEntity;
      jest.spyOn(mailService, 'save').mockResolvedValueOnce(mailEntityMock);
      // Act
      const result = await mailControler.save(body);
      // Expect
      expect(result).toBeDefined();
      expect(mailService.save).toBeCalledTimes(1);
    });
  });
});
