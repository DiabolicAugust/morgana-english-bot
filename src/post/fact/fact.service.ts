import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { plainToClass } from 'class-transformer';
import { Fact } from './class/fact.class.js';

@Injectable()
export class FactService {
  async getOne() {
    const fact = await axios.get(
      'https://morgana-english-admin.onrender.com/fact',
    );

    return plainToClass(Fact, fact.data);
  }
}
