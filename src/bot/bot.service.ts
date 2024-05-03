import { Injectable } from '@nestjs/common';
import {
  Action,
  Command,
  Hears,
  InjectBot,
  Start,
  Update,
} from 'nestjs-telegraf';
import { AppService } from '../app.service.js';
import { Context, Telegraf } from 'telegraf';
import { startButtons } from './start.buttons.js';

@Update()
export class BotService {
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

  @Action('join_channel')
  async handleJoinChannelAction(ctx: Context) {
    await ctx.telegram.approveChatJoinRequest(
      ctx.chatJoinRequest.chat.id,
      ctx.chatJoinRequest.from.id,
    );
  }
}
