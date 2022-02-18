import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/customer (POST)', () => {
    return request(app.getHttpServer())
      .post('/customer')
      .send({
        firstName: 'John',
        lastName: 'Doe',
        phone: '+16069892287',
        email: 'jdoe@nowhere.com',
      })
      .expect(201);
  });
});
