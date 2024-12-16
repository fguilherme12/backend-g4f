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

  describe('Quando as notícias são buscadas', () => {
    it('Então deve retornar todas as notícias', async () => {
      const response = await request(app.getHttpServer())
        .get('/news')
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
    });

    it('Então deve retornar uma notícia específica pelo ID', async () => {
      const createdNews = await request(app.getHttpServer())
        .post('/news')
        .send({ title: 'Notícia', description: 'Descrição' })
        .expect(201);

      const response = await request(app.getHttpServer())
        .get(`/news/${createdNews.body.id}`)
        .expect(200);

      expect(response.body).toEqual(
        expect.objectContaining({
          id: createdNews.body.id,
          title: 'Notícia',
          description: 'Descrição',
        }),
      );
    });

    it('Então deve retornar erro se o ID não existir', async () => {
      const response = await request(app.getHttpServer())
        .get('/news/9999')
        .expect(404);

      expect(response.body.message).toContain('News with ID 9999 not found');
    });
  });
});
