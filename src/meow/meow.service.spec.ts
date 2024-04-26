import { Test, TestingModule } from '@nestjs/testing';
import { MeowService } from './meow.service';

describe('MeowService', () => {
  let service: MeowService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MeowService],
    }).compile();

    service = module.get<MeowService>(MeowService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
