import { Test, TestingModule } from '@nestjs/testing';
import { WinegrapeService } from './winegrape.service';

describe('WinegrapeService', () => {
  let service: WinegrapeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WinegrapeService],
    }).compile();

    service = module.get<WinegrapeService>(WinegrapeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
