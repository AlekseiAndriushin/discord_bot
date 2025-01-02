Бот для парсинга контента из дискорд каналов
Модель вот такая 

```
  id        String   @id
  content   String
  username  String
  timestamp DateTime
  channelId String
```

как запустить все

DISCORD_TOKEN=взять токен
DISCORD_CHANNEL_ID=добавить ID

# Database Credentials
DATABASE_URL="добавить путь"
```
pnpm install
```

```
npx prisma init
```

```
npx prisma migrate dev --name init
```

```
npm run start:dev
```# discord_bot
