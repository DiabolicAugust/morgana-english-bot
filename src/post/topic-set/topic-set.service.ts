import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { plainToClass } from 'class-transformer';
import { TopicSet } from './class/topic-set.class.js';

@Injectable()
export class TopicSetService {
  async getOne() {
    const topicSet = await axios.get(
      'https://morgana-english-admin.onrender.com/topic-set/',
    );
    console.log(topicSet);

    return plainToClass(TopicSet, topicSet.data);
  }
}
