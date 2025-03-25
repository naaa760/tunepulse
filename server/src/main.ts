import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);

    // Enable validation
    app.useGlobalPipes(new ValidationPipe());

    // Enable CORS
    app.enableCors({
      origin: "http://localhost:3000", // Your frontend URL
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      credentials: true,
    });

    const port = process.env.PORT || 4000;
    await app.listen(port);
    console.log(`Application is running on: http://localhost:${port}`);
  } catch (error) {
    console.error("Failed to start application:", error);
    process.exit(1);
  }
}
bootstrap();
