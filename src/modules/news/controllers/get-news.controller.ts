import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { NewsService } from '../services/news.service';
import { NewsEntity } from '../entities/news.entity';

@ApiTags('News')
@Controller('news')
export class GetNewsController {
  constructor(private readonly newsService: NewsService) {}

  @Get()
  @ApiOperation({
    summary: 'Lista detalhes das noticias.',
  })
  async getNews(): Promise<NewsEntity[]> {
    return this.newsService.findAll();
  }

  @Get('/:id')
  @ApiOperation({
    summary: 'Lista detalhes de uma noticia específica.',
  })
  async getNewsById(@Param('id') id: string): Promise<NewsEntity> {
    return this.newsService.findOne(Number(id));
  }
}
