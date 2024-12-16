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

  describe('Quando uma nova notícia é criada', () => {
    it('Então deve retornar sucesso', async () => {
      const payload = {
        title: 'Nova Notícia',
        description: 'Descrição da notícia',
      };

      const response = await request(app.getHttpServer())
        .post('/news')
        .send(payload)
        .expect(201);

      expect(response.body).toEqual(
        expect.objectContaining({
          id: expect.any(Number),
          title: payload.title,
          description: payload.description,
        }),
      );
    });

    it('Então deve retornar erro se o título não for informado', async () => {
      const payload = { description: 'Sem título' };

      const response = await request(app.getHttpServer())
        .post('/news')
        .send(payload)
        .expect(400);

      expect(response.body.message).toContain('O título é obrigatório.');
    });

    it('Então deve retornar erro se a descrição não for informada', async () => {
      const payload = { title: 'Sem descrição' };

      const response = await request(app.getHttpServer())
        .post('/news')
        .send(payload)
        .expect(400);

      expect(response.body.message).toContain('A descrição é obrigatória.');
    });
  });
});
