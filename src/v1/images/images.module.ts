import { Module } from "@nestjs/common";

import { PrismaService } from "src/v0/prisma/prisma.service";
import { ImagesService } from "src/v1/images/images.service";
import { ImagesController } from "src/v1/images/images.controller";

@Module({
  controllers: [ImagesController],
  providers: [ImagesService, PrismaService],
})
export class ImagesModule {}
