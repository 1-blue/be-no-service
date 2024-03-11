import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";

import { AppModule } from "src/app.module";

const bootstrap = async () => {
  try {
    const app = await NestFactory.create(AppModule);

    // DTO에서 정의된 값만 받도록 체크
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
        transformOptions: {
          // string 형식으로 들어오는 number | boolean 자동 형변환 실행하는 옵션
          enableImplicitConversion: true,
        },
      }),
    );

    await app.listen(process.env.PORT);

    console.log(`🚀 ${process.env.PORT}번 서버 연결 성공 !!`);
  } catch (error) {
    console.error("🚀 서버 연결 실패 >> ", error);
  }
};

bootstrap();
