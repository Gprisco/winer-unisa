import { Test, TestingModule } from '@nestjs/testing';
import { WineryController } from './winery.controller';
import { WineryService } from './winery.service';

describe('WineryController', () => {
  let controller: WineryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WineryController],
      providers: [WineryService],
    }).compile();

    controller = module.get<WineryController>(WineryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
