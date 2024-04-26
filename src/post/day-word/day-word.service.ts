import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { plainToClass } from 'class-transformer';
import { DayWord } from './class/day-word.class.js';

@Injectable()
export class DayWordService {
  async getDayWord(): Promise<DayWord> {
    const sentence = await axios.get(
      'https://morgana-english-admin.onrender.com/day-word/',
    );
    return plainToClass(DayWord, sentence.data);
  }
}
