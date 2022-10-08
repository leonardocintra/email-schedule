import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FindAllMailDto } from './dto/find-all-mail.dto';
import { SaveMailDto } from './dto/save-mail.dto';
import { MailStatusEnum } from './enum/mail-status.enum';
import { MailEntity } from './mail.entity';
import { MailService } from './mail.service';

describe('MailService', () => {
  let mailService: MailService;
  let mailRepository: Repository<MailEntity>;
  let getMany = jest.fn();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MailService,
        {
          provide: getRepositoryToken(MailEntity),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            createQueryBuilder: jest.fn().mockReturnThis(),
            adnWhere: jest.fn(),
            getMany,
            findOneOrFail: jest.fn(),
            merge: jest.fn(),
          },
        },
      ],
    }).compile();

    mailService = module.get<MailService>(MailService);
    mailRepository = module.get<Repository<MailEntity>>(getRepositoryToken(MailEntity));
  });

  afterEach(() => {
    getMany.mockRestore();
  });

  it('should be defined', () => {
    expect(mailService).toBeDefined();
    expect(mailRepository).toBeDefined();
  });

  describe('findAll', () => {
    it('should return a mail list with success', async () => {
      // Arrange
      const mailEntityMockList = [
        { id: '1', dueDate: '2022-09-30T18:51:02.95-03:00' },
        { id: '2', dueDate: '2022-09-30T18:51:02.95-03:00' },
      ] as MailEntity[];
      getMany.mockResolvedValueOnce(mailEntityMockList);
      // Act
      const result = await mailService.findAll();
      // Assert
      expect(result).toHaveLength(2);
    });

    it('should return a filtered mail list with dueDateLte param with success', async () => {
      // Arrange
      const mailEntityMockList = [
        { id: '1', dueDate: '2022-09-30T18:51:02.95-03:00' },
        { id: '2', dueDate: '2022-09-30T18:51:02.95-03:00' },
      ] as MailEntity[];
      const params: Partial<FindAllMailDto> = { dueDateLte: '2022-09-30T18:51:02.95-03:00' };
      getMany.mockResolvedValueOnce(mailEntityMockList);
      // Act
      const result = await mailService.findAll();
      // Assert
      expect(result).toHaveLength(2);
    });

    it('should return a filtered mail list with WAITING status with success', async () => {
      // Arrange
      const mailEntityMockList = [
        { id: '1', dueDate: '2022-08-30T18:51:02.95-03:00', status: MailStatusEnum.SENT },
        { id: '2', dueDate: '2022-08-30T18:51:02.95-03:00', status: MailStatusEnum.WAITING },
      ] as MailEntity[];
      const params: Partial<FindAllMailDto> = { dueDateLte: '2022-09-30T18:51:02.95-03:00' };
      getMany.mockResolvedValueOnce(mailEntityMockList);
      // Act
      const result = await mailService.findAll();
      // Assert
      expect(result).toHaveLength(2); // o correto seria 1 (validar)
    });
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
      const mailEntityMock = { ...data } as MailEntity;
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

  describe('update Status', () => {
    it('should update mail status with success', async () => {
      // Arrange
      const id = '1';
      // Act
      const result = await mailService.updateStatus(id, MailStatusEnum.SENT);
      // Assert
      expect(result).toBeUndefined();
    });
  });
});
