import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, Logger, RequestMethod } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Bootstrap');

  // Enable CORS for your frontend
  app.enableCors({
    origin: ['https://tunepulse-three.vercel.app', 'http://localhost:3000'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // Enable validation
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  // Set global prefix
  app.setGlobalPrefix('api', {
    exclude: [{ path: '/', method: RequestMethod.GET }],
  });

  // Add request logging middleware with proper types
  app.use((req: Request, res: Response, next: NextFunction) => {
    logger.log(`${req.method} ${req.url}`);
    logger.log(`Origin: ${req.headers.origin}`);
    next();
  });

  // Use PORT environment variable provided by Render
  const port = process.env.PORT || 4000;
  await app.listen(port);
  logger.log(`Application is running on port ${port}`);
}
bootstrap();
