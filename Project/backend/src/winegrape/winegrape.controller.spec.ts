import { Test, TestingModule } from '@nestjs/testing';
import { WinegrapeController } from './winegrape.controller';
import { WinegrapeService } from './winegrape.service';

describe('WinegrapeController', () => {
  let controller: WinegrapeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WinegrapeController],
      providers: [WinegrapeService],
    }).compile();

    controller = module.get<WinegrapeController>(WinegrapeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
