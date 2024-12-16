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

  describe('Quando uma notícia é atualizada', () => {
    it('Então deve atualizar com sucesso', async () => {
      const createdNews = await request(app.getHttpServer())
        .post('/news')
        .send({ title: 'Original', description: 'Descrição Original' })
        .expect(201);

      const updatedPayload = {
        title: 'Atualizado',
        description: 'Nova Descrição',
      };

      const response = await request(app.getHttpServer())
        .put(`/news/${createdNews.body.id}`)
        .send(updatedPayload)
        .expect(200);

      expect(response.body).toEqual(
        expect.objectContaining({
          id: createdNews.body.id,
          title: updatedPayload.title,
          description: updatedPayload.description,
        }),
      );
    });

    it('Então deve retornar erro para ID inexistente', async () => {
      const payload = { title: 'Título', description: 'Descrição' };

      const response = await request(app.getHttpServer())
        .put('/news/9999')
        .send(payload)
        .expect(404);

      expect(response.body.message).toContain('News with ID 9999 not found');
    });

    it('Então deve retornar erro se os dados forem inválidos', async () => {
      const createdNews = await request(app.getHttpServer())
        .post('/news')
        .send({ title: 'Válido', description: 'Descrição' })
        .expect(201);

      const invalidPayload = { title: '' };

      const response = await request(app.getHttpServer())
        .put(`/news/${createdNews.body.id}`)
        .send(invalidPayload)
        .expect(400);

      expect(response.body.message).toContain('A descrição é obrigatória.');
    });
  });
});
