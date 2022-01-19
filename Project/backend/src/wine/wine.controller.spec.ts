import { Test, TestingModule } from '@nestjs/testing';
import { WineController } from './wine.controller';
import { WineService } from './wine.service';

describe('WineController', () => {
  let controller: WineController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WineController],
      providers: [WineService],
    }).compile();

    controller = module.get<WineController>(WineController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
