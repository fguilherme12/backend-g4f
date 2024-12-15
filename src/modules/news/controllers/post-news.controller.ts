import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { NewsService } from '../services/news.service';
import { CreateNewsDto } from '../dtos/create-news.dto';

@ApiTags('News')
@Controller('news')
export class PostNewsController {
  constructor(private readonly newsService: NewsService) {}

  @Post()
  @ApiOperation({
    summary: 'Cria uma nova noticia.',
  })
  async postNews(@Body() body: CreateNewsDto) {
    return this.newsService.create(body.title, body.description);
  }
}
