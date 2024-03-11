import { Module } from "@nestjs/common";

import { PrismaService } from "src/v0/prisma/prisma.service";
import { UsersService } from "src/v1/users/users.service";
import { UsersController } from "src/v1/users/users.controller";

@Module({
  controllers: [UsersController],
  providers: [UsersService, PrismaService],
})
export class UsersModule {}
