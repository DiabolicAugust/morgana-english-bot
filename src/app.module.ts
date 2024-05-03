import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { BotModule } from './bot/bot.module';
import { PostModule } from './post/post.module.js';
import { ContentStatsModule } from './statistics/content-stats/content-stats.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ScheduleModule.forRoot(),
    BotModule,
    PostModule,
    ContentStatsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
