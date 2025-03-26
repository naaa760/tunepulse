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
    await app.listen(port);
    logger.log(`Application listening on port ${port}`);
}
bootstrap();
//# sourceMappingURL=main.js.map