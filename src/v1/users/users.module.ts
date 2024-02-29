import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { UsersService } from "src/v1/users/users.service";
import { UsersController } from "src/v1/users/users.controller";
import { User } from "src/v1/users/entities/user.entity";

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
