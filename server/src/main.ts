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

    // Enable CORS
    app.enableCors({
      origin: "*", // Allow all origins temporarily for testing
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      allowedHeaders: ["Content-Type", "Authorization"],
      credentials: false, // Set to false when using '*' for origin
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
