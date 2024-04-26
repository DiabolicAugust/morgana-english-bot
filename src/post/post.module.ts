import { Module } from '@nestjs/common';
import { PostService } from './post.service.js';
import { SentenceService } from './sentence/sentence.service';
import { DayWordService } from './day-word/day-word.service';
import { FactService } from './fact/fact.service';
import { TopicSetService } from './topic-set/topic-set.service';

@Module({
  providers: [PostService, SentenceService, DayWordService, FactService, TopicSetService],
})
export class PostModule {}
