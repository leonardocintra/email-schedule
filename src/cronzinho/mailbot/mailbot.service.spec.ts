import { Test, TestingModule } from '@nestjs/testing';
import { MailbotService } from './mailbot.service';

describe('MailbotService', () => {
  let service: MailbotService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MailbotService],
    }).compile();

    service = module.get<MailbotService>(MailbotService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
