import { Injectable, OnModuleInit } from '@nestjs/common';
import { Client, TextChannel, Message } from 'discord.js';
import { PrismaService } from '../prisma/prisma.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DiscordService implements OnModuleInit {
  private client: Client;

  constructor(
    private prisma: PrismaService,
    private configService: ConfigService,
  ) {
    this.client = new Client({
      intents: ['Guilds', 'GuildMessages', 'MessageContent'],
    });
  }

  async onModuleInit() {
    await this.client.login(this.configService.get('DISCORD_TOKEN'));
  }

  async fetchAllMessages() {
    const channelId = this.configService.get('DISCORD_CHANNEL_ID');
    const channel = await this.client.channels.fetch(channelId) as TextChannel;
    
    let lastMessageId = null;
    let hasMore = true;

    while (hasMore) {
      const options = {
        limit: 100,
        ...(lastMessageId && { before: lastMessageId }),
      };

      const messages = await channel.messages.fetch(options);
      
      if (messages.size < 100) {
        hasMore = false;
      }

      if (messages.size > 0) {
        const messageData = messages.map(msg => ({
          id: msg.id,
          content: msg.content,
          username: msg.author.username,
          timestamp: msg.createdAt,
          channelId: channelId,
        }));

        await this.prisma.message.createMany({
          data: messageData,
          skipDuplicates: true,
        });

        lastMessageId = messages.last().id;
      } else {
        hasMore = false;
      }
    }
  }
}