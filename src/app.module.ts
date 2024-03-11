import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { PrismaService } from "src/v0/prisma/prisma.service";
import { CatsModule } from "src/v1/cats/cats.module";
import { ImagesModule } from "src/v1/images/images.module";
import { UsersModule } from "src/v1/users/users.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    CatsModule,
    ImagesModule,
    UsersModule,
  ],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
