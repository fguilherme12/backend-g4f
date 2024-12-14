import { Module } from '@nestjs/common';
import { GetNewsController } from './controllers/get-news.controller';
import { NewsService } from './services/news.service';
import { PostNewsController } from './controllers/post-news.controller';
import { UpdateNewsController } from './controllers/update-news.controller';
import { DeleteNewsController } from './controllers/delete-news.controller';

@Module({
  imports: [],
  controllers: [
    GetNewsController,
    PostNewsController,
    UpdateNewsController,
    DeleteNewsController,
  ],
  exports: [NewsService],
  providers: [NewsService],
})
export class NewsModule {}
