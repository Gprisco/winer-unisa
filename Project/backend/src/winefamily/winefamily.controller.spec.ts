import { Test, TestingModule } from '@nestjs/testing';
import { WinefamilyController } from './winefamily.controller';
import { WinefamilyService } from './winefamily.service';

describe('WinefamilyController', () => {
  let controller: WinefamilyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WinefamilyController],
      providers: [WinefamilyService],
    }).compile();

    controller = module.get<WinefamilyController>(WinefamilyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
