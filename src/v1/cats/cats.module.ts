import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { CatsController } from "src/v1/cats/cats.controller";
import { CatsService } from "src/v1/cats/cats.service";
import { Cat } from "src/v1/cats/entities/cat.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Cat])],
  controllers: [CatsController],
  providers: [CatsService],
})
export class CatsModule {}
