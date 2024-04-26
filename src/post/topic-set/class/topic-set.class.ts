import { Type } from 'class-transformer';
import { Word } from 'morgana-english-shared/dist/models/word.model.js';

export class TopicSet {
  @Type(() => String)
  _id: string;

  topic: string;
  topicTranslation: string;
  sentence: string;
  sentenceTranslation: string;

  @Type(() => Word)
  words: [Word];

  @Type(() => Number)
  __v: number;

  @Type(() => Date)
  createdAt: Date;

  @Type(() => Date)
  updatedAt: Date;

  // Additional methods can be added here
  getFormattedDate(): string {
    return this.createdAt.toISOString();
  }
}
