import { Type } from 'class-transformer';

export class DayWord {
  @Type(() => String)
  _id: string;

  wordOfDay: string;

  translation: string;
  history: string;

  used: boolean;
  fact: string;

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
