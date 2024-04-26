import { Type } from 'class-transformer';

export class Fact {
  @Type(() => String)
  _id: string;

  fact: string;
  translation: string;

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
