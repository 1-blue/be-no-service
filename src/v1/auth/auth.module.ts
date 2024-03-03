import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { TypeOrmModule } from "@nestjs/typeorm";

import { AuthService } from "src/v1/auth/auth.service";
import { AuthController } from "src/v1/auth/auth.controller";
import { UsersModule } from "src/v1/users/users.module";
import { User } from "src/v1/users/entities/user.entity";
import { LocalStrategy } from "src/v1/auth/local.strategy";
import { LocalSerializer } from "src/v1/auth/local.serializer";

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forFeature([User]),
    PassportModule.register({ session: true }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, LocalSerializer],
})
export class AuthModule {}
