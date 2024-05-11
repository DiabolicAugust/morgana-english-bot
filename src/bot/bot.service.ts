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
  private waitingForPhoto: boolean = false;
  private currentText: string = '';
  private currentPhotoUrl: string = '';
  private channelUrl: string = '';
  private urlEntities = [];
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
    this.waitingForPhoto = false;
  }

  @On('text')
  async onText(ctx: Context) {
    if (!this.isEditing || !ctx.message || !('text' in ctx.message)) {
      return; // Ignore non-text messages or when not in edit mode
    }
    if (this.waitingForText) {
      // Replace all URLs found in entities and update entities to reflect changes
      if (ctx.message.entities) {
        console.log(ctx.message.entities);
        this.urlEntities = ctx.message.entities;
      }

      this.currentText = ctx.message.text; // Update text with new URLs
    }

    // Check if the bot is waiting for a new URL to replace existing ones
    if (this.waitingForLink && ctx.message.text) {
      this.channelUrl = ctx.message.text;

      if (this.urlEntities) {
        let otherEntities = this.urlEntities.filter(
          (entity) => entity.type != 'text_link',
        );

        this.urlEntities = this.urlEntities
          .filter((entity) => entity.type === 'text_link')
          .map((entity) => {
            return {
              offset: entity.offset,
              length: entity.length,
              type: 'text_link',
              url: this.channelUrl,
            };
          });
        this.urlEntities.push(...otherEntities);
        console.log(this.urlEntities);
      }

      await ctx.reply('Text updated with new links. Please send a photo now.');
      this.waitingForLink = false;
      this.waitingForPhoto = true;
    } else if (this.waitingForText && ctx.message.text) {
      this.currentText = ctx.message.text;
      await ctx.reply('Got it! Now send me the link to replace placeholders.');
      this.waitingForText = false;
      this.waitingForLink = true;
    }
  }

  @On('photo')
  async onPhoto(ctx: Context) {
    if (!this.isEditing || !this.waitingForPhoto) {
      return; // Ignore photos if not in the correct stage
    }

    // Check if the message has a photo
    if ('photo' in ctx.message && ctx.message.photo.length > 0) {
      const photoArray = ctx.message.photo;
      const highestQualityPhoto = photoArray[photoArray.length - 1].file_id;
      this.currentPhotoUrl = highestQualityPhoto;

      await ctx.replyWithPhoto(this.currentPhotoUrl, {
        caption: this.currentText,
        reply_markup: Markup.inlineKeyboard([
          [Markup.button.url('Приєднатися✅', this.channelUrl)],
          [Markup.button.url('Учасники(87/100)', this.channelUrl)],
        ]).reply_markup,
        caption_entities: this.urlEntities,
      });

      this.resetState();
    } else {
      // Inform user if no photo is found in the message
      await ctx.reply('Please send a valid photo.');
    }
  }

  private resetState() {
    this.isEditing = false;
    this.waitingForText = false;
    this.waitingForLink = false;
    this.waitingForPhoto = false;
    this.currentText = '';
    this.currentPhotoUrl = '';
  }
}
