import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MessagesService {
  constructor(private prisma: PrismaService) {}

  async getMessagesByUsername(
    username: string,
    startDate?: Date,
    endDate?: Date,
  ) {
    const whereClause: any = {
      username,
    };

    if (startDate || endDate) {
      whereClause.timestamp = {};
      if (startDate) {
        whereClause.timestamp.gte = startDate;
      }
      if (endDate) {
        whereClause.timestamp.lte = endDate;
      }
    }


    const messages = await this.prisma.message.findMany({
      where: whereClause,
      orderBy: {
        timestamp: 'desc',
      },
    });


    return messages;
  }
}