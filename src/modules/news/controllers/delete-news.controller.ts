import { Controller, Delete, Param } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { NewsService } from '../services/news.service';

@ApiTags('News')
@Controller('news')
export class DeleteNewsController {
  constructor(private readonly newsService: NewsService) {}

  @Delete('/:id')
  @ApiOperation({
    summary: 'Deleta uma noticia existente.',
  })
  async deleteNews(@Param('id') id: string) {
    return this.newsService.delete(Number(id));
  }
}
