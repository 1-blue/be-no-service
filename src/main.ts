import { NestFactory } from "@nestjs/core";

import { AppModule } from "src/app.module";

const bootstrap = async () => {
  try {
    const app = await NestFactory.create(AppModule);
    await app.listen(process.env.PORT);

    console.log(`🚀 ${process.env.PORT}번 서버 연결 성공 !!`);
  } catch (error) {
    console.error("🚀 서버 연결 실패 >> ", error);
  }
};

bootstrap();
