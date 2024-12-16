import { Injectable, NotFoundException } from '@nestjs/common';
import { NewsEntity } from '../entities/news.entity';

@Injectable()
export class NewsService {
  private news: NewsEntity[] = [];
  private idCounter = 1;

  findAll(): NewsEntity[] {
    return this.news;
  }

  findOne(id: number): NewsEntity {
    const news = this.news.find((n) => n.id === id);

    if (!news) {
      throw new NotFoundException(`News with ID ${id} not found`);
    }

    return news;
  }

  create(title: string, description: string): NewsEntity {
    const createNews: NewsEntity = {
      id: this.idCounter++,
      title,
      description,
    };

    this.news.push(createNews);
    return createNews;
  }

  update(
    id: number,
    title: string,
    description: string,
  ): NewsEntity | undefined {
    const index = this.news.findIndex((n) => n.id === id);

    if (index === -1) {
      throw new NotFoundException(`News with ID ${id} not found`);
    }

    this.news[index].title = title;
    this.news[index].description = description;

    return this.news[index];
  }

  delete(id: number): NewsEntity[] {
    const index = this.news.findIndex((n) => n.id === id);

    if (index === -1) {
      throw new NotFoundException(`News with ID ${id} not found`);
    }

    this.news.splice(index, 1);
    return this.news;
  }
}
