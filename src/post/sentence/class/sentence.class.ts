import { Type } from 'class-transformer';

class Options {
  a: string;
  b: string;
  c: string;
}

export class Sentence {
  @Type(() => String)
  _id: string;

  sentence: string;
  answer: string;

  @Type(() => Options)
  options: Options;

  used: boolean;
  explanation: string;

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
