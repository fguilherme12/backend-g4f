import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from 'src/app.module';

describe('News Module (e2e) - Criação de Notícias', () => {
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

  it('Deve criar uma nova notícia com sucesso', async () => {
    const payload = {
      title: 'Nova Notícia',
      description: 'Esta é uma descrição da notícia',
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

  it('Deve retornar erro ao tentar criar notícia sem título', async () => {
    const payload = {
      description: 'Esta é uma descrição sem título',
    };

    const response = await request(app.getHttpServer())
      .post('/news')
      .send(payload)
      .expect(400);

    expect(response.body.message).toContain('O título é obrigatório.');
  });

  it('Deve retornar erro ao tentar criar notícia sem descrição', async () => {
    const payload = {
      title: 'Notícia sem descrição',
    };

    const response = await request(app.getHttpServer())
      .post('/news')
      .send(payload)
      .expect(400);

    expect(response.body.message).toContain('A descrição é obrigatória.');
  });
});
