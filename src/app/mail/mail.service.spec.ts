import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SaveMailDto } from './dto/save-mail.dto';
import { MailEntity } from './mail.entity';
import { MailService } from './mail.service';

describe('MailService', () => {
  let mailService: MailService;
  let mailRepository: Repository<MailEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MailService,
        {
          provide: getRepositoryToken(MailEntity),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    mailService = module.get<MailService>(MailService);
    mailRepository = module.get<Repository<MailEntity>>(getRepositoryToken(MailEntity));
  });

  it('should be defined', () => {
    expect(mailService).toBeDefined();
    expect(mailRepository).toBeDefined();
  });

  describe('save', () => {
    it('should save a new mail with success', async () => {
      // Arrange
      const data: SaveMailDto = {
        destinationAddress: 'user@gmail.com',
        dueDate: '2022-09-30T18:51:02.95-03:00',
        destinationName: 'Usuario Teste',
        subject: 'Teste de email',
        body: '<h1>Hi tudo nice ?</h1>',
      };
      const mailEntityMock = {
        destinationAddress: 'user@gmail.com',
        dueDate: '2022-09-30T18:51:02.95-03:00',
        destinationName: 'Usuario Teste',
        subject: 'Teste de email',
        body: '<h1>Hi tudo nice ?</h1>',
      } as MailEntity;
      jest.spyOn(mailRepository, 'create').mockReturnValueOnce(mailEntityMock);
      jest.spyOn(mailRepository, 'save').mockResolvedValueOnce(mailEntityMock);

      // Act
      const result = await mailService.save(data);

      // Assert
      expect(result).toBeDefined();
      expect(mailRepository.create).toBeCalledTimes(1);
      expect(mailRepository.save).toBeCalledTimes(1);
    });
  });
});
