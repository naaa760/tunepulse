import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.enableCors({
    origin: ['*'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // Use the PORT environment variable provided by Render
  const port = process.env.PORT || 4000;
  await app.listen(port);
  console.log(`Application is running on port: ${port}`);
}
bootstrap();
