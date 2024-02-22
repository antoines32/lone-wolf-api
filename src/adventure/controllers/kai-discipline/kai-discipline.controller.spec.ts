import { Test, TestingModule } from '@nestjs/testing';
import { KaiDisciplineController } from './kai-discipline.controller';

describe('KaiDisciplineController', () => {
  let controller: KaiDisciplineController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [KaiDisciplineController],
    }).compile();

    controller = module.get<KaiDisciplineController>(KaiDisciplineController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
