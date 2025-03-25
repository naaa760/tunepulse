"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
async function bootstrap() {
    try {
        const app = await core_1.NestFactory.create(app_module_1.AppModule);
        app.useGlobalPipes(new common_1.ValidationPipe());
        app.enableCors({
            origin: "http://localhost:3000",
            methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
            credentials: true,
        });
        const port = process.env.PORT || 4000;
        await app.listen(port);
        console.log(`Application is running on: http://localhost:${port}`);
    }
    catch (error) {
        console.error("Failed to start application:", error);
        process.exit(1);
    }
}
bootstrap();
//# sourceMappingURL=main.js.map