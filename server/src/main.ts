import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { Logger } from "@nestjs/common";

async function bootstrap() {
  const logger = new Logger("Bootstrap");
  const app = await NestFactory.create(AppModule);

  // Enable CORS for frontend
  app.enableCors({
    origin: true, // Allow all origins in development
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    credentials: true,
    allowedHeaders: "Content-Type, Accept, Authorization",
  });

  // Set global prefix for all routes
  // app.setGlobalPrefix("api");

  // Enable validation
  app.useGlobalPipes(new ValidationPipe());

  // Use PORT from environment or default to 4000
  // Render sets the PORT environment variable
  const port = process.env.PORT || 4000;

  // Log the port we're using
  logger.log(`Attempting to listen on port ${port}`);

  // Listen on all interfaces (0.0.0.0) to make it accessible from outside
  await app.listen(port, "0.0.0.0");

  logger.log(`Application successfully started and listening on port ${port}`);
}

bootstrap().catch((err) => {
  console.error("Failed to start application:", err);
  process.exit(1);
});
