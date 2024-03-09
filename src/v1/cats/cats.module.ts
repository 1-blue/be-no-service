import { Module } from "@nestjs/common";

import { PrismaService } from "src/v0/prisma/prisma.service";
import { CatsController } from "src/v1/cats/cats.controller";
import { CatsService } from "src/v1/cats/cats.service";

@Module({
  controllers: [CatsController],
  providers: [CatsService, PrismaService],
})
export class CatsModule {}
