"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const common_2 = require("@nestjs/common");
async function bootstrap() {
    const logger = new common_2.Logger("Bootstrap");
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: true,
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
        credentials: true,
        allowedHeaders: "Content-Type, Accept, Authorization",
    });
    app.useGlobalPipes(new common_1.ValidationPipe());
    const port = process.env.PORT || 4000;
    logger.log(`Attempting to listen on port ${port}`);
    await app.listen(port, "0.0.0.0");
    logger.log(`Application successfully started and listening on port ${port}`);
}
bootstrap().catch((err) => {
    console.error("Failed to start application:", err);
    process.exit(1);
});
//# sourceMappingURL=main.js.map