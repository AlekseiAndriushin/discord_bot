import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppConfigModule } from './config/config.module';
import { PrismaModule } from './prisma/prisma.module';
import { DiscordModule } from './discord/discord.module';
import { MessagesModule } from './messages/messages.module';


@Module({
  imports: [AppConfigModule,
    PrismaModule,
    DiscordModule,
    MessagesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
