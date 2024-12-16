import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from 'src/app.module';

describe('Dado o módulo de notícias', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('Quando uma notícia é deletada', () => {
    it('Então deve deletar com sucesso', async () => {
      const createdNews = await request(app.getHttpServer())
        .post('/news')
        .send({ title: 'Para Deletar', description: 'Descrição' })
        .expect(201);

      await request(app.getHttpServer())
        .delete(`/news/${createdNews.body.id}`)
        .expect(200);

      const response = await request(app.getHttpServer())
        .get(`/news/${createdNews.body.id}`)
        .expect(404);

      expect(response.body.message).toContain(
        `News with ID ${createdNews.body.id} not found`,
      );
    });

    it('Então deve retornar erro para ID inexistente', async () => {
      const response = await request(app.getHttpServer())
        .delete('/news/9999')
        .expect(404);

      expect(response.body.message).toContain('News with ID 9999 not found');
    });
  });
});
