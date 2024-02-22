import { Test, TestingModule } from '@nestjs/testing';
import { KaiDisciplineService } from './kai-discipline.service';

describe('KaiDisciplineService', () => {
  let service: KaiDisciplineService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KaiDisciplineService],
    }).compile();

    service = module.get<KaiDisciplineService>(KaiDisciplineService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
