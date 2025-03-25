import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { Request, Response } from "express";

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

    // Improved CORS configuration
    app.enableCors({
      origin: "*", // Allow all origins
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
      allowedHeaders: "*", // Allow all headers
      preflightContinue: false,
      optionsSuccessStatus: 204,
    });

    // Add health check endpoint
    app.use("/health-check", (req: Request, res: Response) => {
      res
        .status(200)
        .json({ status: "ok", timestamp: new Date().toISOString() });
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
