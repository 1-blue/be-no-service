import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";

import { AuthService } from "src/v1/auth/auth.service";
import { AuthController } from "src/v1/auth/auth.controller";
import { UsersModule } from "src/v1/users/users.module";
import { MyPassportSerializer } from "src/v1/auth/passport/passport.serializer";
import { LocalStrategy } from "src/v1/auth/local/local.strategy";
import { KakaoStrategy } from "src/v1/auth/kakao/kakao.strategy";
import { GoogleStrategy } from "src/v1/auth/google/google.strategy";

@Module({
  imports: [UsersModule, PassportModule.register({ session: true })],
  controllers: [AuthController],
  providers: [
    AuthService,
    MyPassportSerializer,
    LocalStrategy,
    KakaoStrategy,
    GoogleStrategy,
  ],
})
export class AuthModule {}
