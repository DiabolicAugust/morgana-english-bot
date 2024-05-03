import { Injectable } from '@nestjs/common';
import { Command, Hears, InjectBot, On, Start, Update } from 'nestjs-telegraf';
import { AppService } from '../app.service.js';
import { Context, Markup, Telegraf } from 'telegraf';
import { startButtons } from './start.buttons.js';

@Update()
export class BotService {
  private isEditing: boolean = false; // Control flag to start editing process
  private waitingForText: boolean = false;
  private waitingForLink: boolean = false;
  private currentText: string = '';
  constructor(
    @InjectBot() private readonly bot: Telegraf<Context>,
    private readonly appService: AppService,
  ) {}

  @Start()
  async startCommand(ctx: Context) {
    await ctx.reply('Hi, bebe');
    await ctx.reply('Need something?', startButtons());
  }

  @Hears('Say meow')
  async sayMeow(ctx: Context) {
    await ctx.reply('Meow');
  }

  @Command('edit')
  async editCommand(ctx: Context) {
    await ctx.reply('Please send me the text.');
    this.isEditing = true;
    this.waitingForText = true;
    this.waitingForLink = false;
  }

  @On('text')
  async onText(ctx: Context) {
    if (!this.isEditing || !ctx.message || !('text' in ctx.message)) {
      return; // Ignore non-text messages or when not in edit mode
    }

    if (this.waitingForText && ctx.message.text) {
      this.currentText = ctx.message.text;
      await ctx.reply('Got it! Now send me the link to replace placeholders.');
      this.waitingForText = false;
      this.waitingForLink = true;
    } else if (this.waitingForLink && ctx.message.text) {
      const url = ctx.message.text;
      const updatedText = this.currentText.replace(/\(.*?\)/g, url);
      await ctx.telegram.sendMessage(ctx.chat.id, updatedText, {
        reply_markup: Markup.inlineKeyboard([
          Markup.button.url('Приєднатися✅', url),
          Markup.button.url('Учасники(87/100)', url),
        ]).reply_markup,
      });
      this.isEditing = false;
      this.waitingForLink = false;
    }
  }
}
