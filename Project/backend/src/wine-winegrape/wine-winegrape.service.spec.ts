import { Test, TestingModule } from '@nestjs/testing';
import { WineWinegrapeService } from './wine-winegrape.service';

describe('WineWinegrapeService', () => {
  let service: WineWinegrapeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WineWinegrapeService],
    }).compile();

    service = module.get<WineWinegrapeService>(WineWinegrapeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
