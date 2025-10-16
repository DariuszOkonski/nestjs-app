import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { LoggerInterceptor } from './shared/interceptors/logger.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalInterceptors(new LoggerInterceptor());
  app.setGlobalPrefix('api');

  await app.enableShutdownHooks();

  await app.listen(3000);
}
bootstrap();

// for migration run:
// npx prisma migrate dev --name add-product-order-relation
// npx prisma migrate dev --name add-ondelete-for-order
// npx prisma migrate dev --name add-client
//  npx prisma migrate dev --name add-product-order-relation add-client-order-relation
