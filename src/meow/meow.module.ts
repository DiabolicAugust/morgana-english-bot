import { Module } from '@nestjs/common';
import { MeowService } from './meow.service.js';

@Module({
  providers: [MeowService],
})
export class MeowModule {}
