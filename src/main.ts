import { NestFactory } from "@nestjs/core";
import * as session from "express-session";
import * as passport from "passport";

import { AppModule } from "src/app.module";

const bootstrap = async () => {
  try {
    const app = await NestFactory.create(AppModule);

    // cors
    app.enableCors({
      credentials: true,
      origin: [process.env.CLIENT_URL],
    });

    app.use(
      session({
        resave: false,
        saveUninitialized: false,
        secret: process.env.COOKIE_SECRET,
        cookie: {
          httpOnly: true,
          sameSite: "lax",
        },
      }),
    );
    app.use(passport.initialize());
    app.use(passport.session());

    await app.listen(process.env.PORT);

    console.log(`🚀 ${process.env.PORT}번 서버 연결 성공 !!`);
  } catch (error) {
    console.error("🚀 서버 연결 실패 >> ", error);
  }
};

bootstrap();
