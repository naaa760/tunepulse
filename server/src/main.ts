import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.enableCors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  });

  // Set global prefix for all routes
  // app.setGlobalPrefix("api");

  // Enable validation
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(process.env.PORT || 4000);
}
bootstrap();
