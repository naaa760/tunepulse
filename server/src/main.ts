import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { Logger } from "@nestjs/common";

async function bootstrap() {
  const logger = new Logger("Bootstrap");
  const app = await NestFactory.create(AppModule);

  // Enable CORS for frontend
  app.enableCors({
    origin: process.env.FRONTEND_URL || "*",
    credentials: true,
  });

  // Set global prefix for all routes
  // app.setGlobalPrefix("api");

  // Enable validation
  app.useGlobalPipes(new ValidationPipe());

  // Use PORT from environment or default to 4000
  const port = process.env.PORT || 4000;

  await app.listen(port);
  logger.log(`Application listening on port ${port}`);
}
bootstrap();
