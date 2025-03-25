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

    // Fix CORS configuration
    app.enableCors({
      origin: true, // Allow all origins in development
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
      allowedHeaders: "Content-Type,Accept,Authorization",
      exposedHeaders: ["Content-Length", "Date"],
      credentials: false, // Change to false if you don't need credentials
      maxAge: 86400, // 24 hours
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
