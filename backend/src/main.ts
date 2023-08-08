import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const port = process.env.PORT || 3001;
  const host = process.env.HOST || '';

  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(port, host);
}
bootstrap();
