import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);

    // Enable validation
    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        whitelist: true,
      })
    );

    // Enable CORS with specific configuration
    app.enableCors({
      origin: "*", // Keep this for now to debug
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
      allowedHeaders: ["Content-Type", "Accept", "Authorization"],
      exposedHeaders: ["Content-Range", "X-Content-Range"],
      credentials: false,
      preflightContinue: false,
      optionsSuccessStatus: 204,
    });

    // Use PORT from environment or fallback to 4000
    const port = process.env.PORT || 4000;

    await app.listen(port, "0.0.0.0"); // Listen on all network interfaces
    console.log(`Application is running on: http://localhost:${port}`);
  } catch (error) {
    console.error("Failed to start application:", error);
    process.exit(1);
  }
}
bootstrap();
