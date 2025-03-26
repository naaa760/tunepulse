import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Fix CORS issues
  app.enableCors({
    origin: '*', // Allow all origins temporarily to debug
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Accept, Authorization',
    credentials: true,
  });

  // Use the PORT environment variable provided by Render
  const port = process.env.PORT || 4000;
  await app.listen(port, '0.0.0.0');
  console.log(`Application is running on port: ${port}`);
}
bootstrap();
