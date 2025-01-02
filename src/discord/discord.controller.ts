
import { Controller, Post } from '@nestjs/common';
import { DiscordService } from './discord.service';

@Controller('discord')
export class DiscordController {
  constructor(private discordService: DiscordService) {}

  @Post('fetch-messages')
  async fetchMessages() {
    try {
      const result = await this.discordService.fetchAllMessages();
      return { status: 'success', message: 'Messages fetched and saved' };
    } catch (error) {
      console.error('Error fetching messages:', error);
      return { status: 'error', message: error.message };
    }
  }
}