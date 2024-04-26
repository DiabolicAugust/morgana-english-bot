import { Test, TestingModule } from '@nestjs/testing';
import { TopicSetService } from './topic-set.service';

describe('TopicSetService', () => {
  let service: TopicSetService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TopicSetService],
    }).compile();

    service = module.get<TopicSetService>(TopicSetService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
