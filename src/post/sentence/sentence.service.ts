import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { plainToClass } from 'class-transformer';
import { Sentence } from './class/sentence.class.js';

@Injectable()
export class SentenceService {
  async getSentence(): Promise<Sentence> {
    const sentence = await axios.get(
      'https://morgana-english-admin.onrender.com/sentence/',
    );
    return plainToClass(Sentence, sentence.data);
  }
}
