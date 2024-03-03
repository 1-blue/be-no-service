import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from "@nestjs/common";

import { UsersService } from "src/v1/users/users.service";
import type { CreateUserDto } from "src/v1/users/dto/create-user.dto";
import type { UpdateUserDto } from "src/v1/users/dto/update-user.dto";
import type { RequestWithUser } from "src/types";

@Controller("api/v1/users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get("me")
  findMe(@Req() req: RequestWithUser) {
    return req.user;
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(":id")
  delete(@Param("id") id: string) {
    return this.usersService.delete(id);
  }

  @Post("/check/email")
  hasDuplicateEmail(@Body() { email }: { email: string }) {
    return this.usersService.hasDuplicateEmail(email);
  }

  @Post("/check/nickname")
  hasDuplicateNickname(@Body() { nickname }: { nickname: string }) {
    return this.usersService.hasDuplicateNickname(nickname);
  }

  @Post("/check/phone")
  hasDuplicatePhone(@Body() { phone }: { phone: string }) {
    return this.usersService.hasDuplicatePhone(phone);
  }

  @Post("/validate")
  validate(@Body() { email, password }: { email: string; password: string }) {
    return this.usersService.validate(email, password);
  }
}
