import { Injectable } from '@nestjs/common';
import { Hears, Update } from 'nestjs-telegraf';
import { Context } from 'telegraf';

@Update()
export class MeowService {
  @Hears('Say bark')
  async sayMeow(ctx: Context) {
    await ctx.reply('Bark');
  }
}
