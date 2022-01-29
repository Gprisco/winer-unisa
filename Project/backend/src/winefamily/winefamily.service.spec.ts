import { Test, TestingModule } from '@nestjs/testing';
import { WinefamilyService } from './winefamily.service';

describe('WinefamilyService', () => {
  let service: WinefamilyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WinefamilyService],
    }).compile();

    service = module.get<WinefamilyService>(WinefamilyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
