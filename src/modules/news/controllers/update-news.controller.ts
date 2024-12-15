import { Body, Controller, Param, Put } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { NewsService } from '../services/news.service';
import { CreateNewsDto } from '../dtos/create-news.dto';

@ApiTags('News')
@Controller('news')
export class UpdateNewsController {
  constructor(private readonly newsService: NewsService) {}

  @Put('/:id')
  @ApiOperation({
    summary: 'Atualiza uma noticia existente.',
  })
  async updateNews(@Param('id') id: string, @Body() body: CreateNewsDto) {
    return this.newsService.update(Number(id), body.title, body.description);
  }
}
