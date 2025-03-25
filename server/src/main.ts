import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { Request, Response } from "express";

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule, { cors: true });

    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        whitelist: true,
      })
    );

    // More permissive CORS configuration
    app.enableCors({
      origin: true,
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
      credentials: false,
      allowedHeaders:
        "Content-Type,Accept,Authorization,Origin,X-Requested-With",
      exposedHeaders: "Content-Range,X-Content-Range",
      maxAge: 3600,
    });

    // Add CORS preflight handler
    app.use((req: Request, res: Response, next: Function) => {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
      res.header(
        "Access-Control-Allow-Headers",
        "Content-Type, Accept, Authorization"
      );

      if (req.method === "OPTIONS") {
        res.status(200).end();
        return;
      }

      next();
    });

    // Add health check endpoint
    app.use("/health-check", (req: Request, res: Response) => {
      res
        .status(200)
        .json({ status: "ok", timestamp: new Date().toISOString() });
    });

    const port = process.env.PORT || 4000;

    await app.listen(port, "0.0.0.0");
    console.log(`Application is running on: http://localhost:${port}`);
  } catch (error) {
    console.error("Failed to start application:", error);
    process.exit(1);
  }
}
bootstrap();
