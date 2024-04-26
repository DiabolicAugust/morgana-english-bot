import { Test, TestingModule } from '@nestjs/testing';
import { DayWordService } from './day-word.service';

describe('DayWordService', () => {
  let service: DayWordService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DayWordService],
    }).compile();

    service = module.get<DayWordService>(DayWordService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
