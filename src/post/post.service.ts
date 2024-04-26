import { Injectable } from '@nestjs/common';
import { Hears, InjectBot, Start, Update } from 'nestjs-telegraf';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Context, Telegraf } from 'telegraf';
import { SentenceService } from './sentence/sentence.service.js';
import { DayWordService } from './day-word/day-word.service.js';
import {
  capitalizeFirstLetter,
  centerText,
  escapeMarkdownV2,
} from '../service/strings.service.js';
import { FactService } from './fact/fact.service.js';
import { TopicSetService } from './topic-set/topic-set.service.js';

@Injectable()
export class PostService {
  constructor(
    @InjectBot() private readonly bot: Telegraf<Context>,
    private readonly sentenceService: SentenceService,
    private readonly dayWordService: DayWordService,
    private readonly topicSetService: TopicSetService,
    private readonly factService: FactService,
  ) {}

  @Cron('0 9 * * *', {
    timeZone: 'Europe/Kyiv',
  })
  //   @Cron(CronExpression.EVERY_30_SECONDS)
  async handleTopicSet() {
    console.log('start');
    const channelId = process.env.TELEGRAM_CHANNEL_ID;
    try {
      const topicSet = await this.topicSetService.getOne();
      console.log(topicSet);
      const photoPath = './src/assets/AstroMaticWords.png';
      const message =
        `*🌌 Тема:  ${escapeMarkdownV2(topicSet.topic)}*\n\n` +
        `\n✨_Приклад речення: _ "${escapeMarkdownV2(topicSet.sentence)}"\n\n` +
        `||${escapeMarkdownV2(topicSet.sentenceTranslation)}||\n\n` +
        `🚀 Слова та їх переклади:\n\n` +
        topicSet.words
          .map(
            (word) =>
              `🪐 *${escapeMarkdownV2(word.word)}* 🛸 ${escapeMarkdownV2(word.translation)}\n\n`,
          )
          .join('') +
        `\\#AstroMaticWords`;

      await this.bot.telegram.sendPhoto(
        channelId,
        { source: photoPath },
        {
          caption: message,
          parse_mode: 'MarkdownV2',
        },
      );
      console.log('Message sent successfully.');
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  }

  @Cron('0 12,15 * * *', {
    timeZone: 'Europe/Kyiv',
  })
  //   @Cron(CronExpression.EVERY_30_SECONDS)
  async sentenceHandle() {
    const channelId = process.env.TELEGRAM_CHANNEL_ID;
    try {
      const sentence = await this.sentenceService.getSentence();
      const message = `${sentence.sentence}`;

      const options = Object.values(sentence.options);
      const answer = options.indexOf(sentence.options[sentence.answer]);
      const photoPath = './src/assets/StarQuiz.png';
      const tag = '#StarQuiz';

      await this.bot.telegram.sendPhoto(
        channelId,
        { source: photoPath },
        {
          caption: tag,
        },
      );

      await this.bot.telegram.sendQuiz(channelId, message, options, {
        is_anonymous: true,
        allows_multiple_answers: false,
        correct_option_id: answer,
        explanation: sentence.explanation,
      });
      console.log('Message sent successfully.');
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  }

  //   @Cron('0 9 * * *', {
  //     timeZone: 'Europe/Kyiv',
  //   })
  //   @Cron(CronExpression.EVERY_30_SECONDS)
  //   async handleWordDay() {
  //     console.log('start');
  //     const channelId = process.env.TELEGRAM_CHANNEL_ID;
  //     try {
  //       const dayWord = await this.dayWordService.getDayWord();
  //       console.log(dayWord);
  //       const message = `<b>${'📚 ' + capitalizeFirstLetter(dayWord.wordOfDay) + ' 📚'}</b>  -   🪐 ${capitalizeFirstLetter(dayWord.translation)} 🪐\n\n
  // 	  <b>🌌 Історія 🌌</b>\n${dayWord.history}\n\n<b>🌠 Цікавинка 🌠</b>\n${dayWord.fact}\n#CosmoWord`;

  //       const photoPath = './src/assets/banner.jpg';

  //       await this.bot.telegram.sendPhoto(
  //         channelId,
  //         { source: photoPath },
  //         {
  //           caption: message,
  //           parse_mode: 'HTML',
  //         },
  //       );
  //       console.log('Message sent successfully.');
  //     } catch (error) {
  //       console.error('Failed to send message:', error);
  //     }
  //   }

  @Cron('0 18 * * *', {
    timeZone: 'Europe/Kyiv',
  })
  //   @Cron(CronExpression.EVERY_30_SECONDS)
  async handleFact() {
    console.log('start');
    const channelId = process.env.TELEGRAM_CHANNEL_ID;
    try {
      const fact = await this.factService.getOne();
      console.log(fact);
      const message = `🌌🌿 **Did You Know?** 🌿🌌\n\n🌠 ${escapeMarkdownV2(fact.fact)}🌿🌀\n\n 🚀 ${escapeMarkdownV2(fact.translation)} 🌍 \n\n🪐 Explore this fascinating fact in our cosmic garden of knowledge\\. 🌍✨\n\n🔭 \\#FactSpace`;

      const photoPath = './src/assets/FactSpace.png';

      await this.bot.telegram.sendPhoto(
        channelId,
        { source: photoPath },
        {
          caption: message,
          parse_mode: 'MarkdownV2',
        },
      );
      console.log('Message sent successfully.');
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  }
}
