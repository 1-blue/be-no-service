import { Controller, HttpCode, Post, Req, UseGuards } from "@nestjs/common";

import { LocalAuthGuard } from "./local-auth.guard";
import { RequestWithUser } from "src/types";

@Controller("api/v1/auth")
export class AuthController {
  constructor() {}

  @UseGuards(LocalAuthGuard)
  @Post("login")
  @HttpCode(200)
  async login(@Req() req: RequestWithUser) {
    return req.user;
  }

  @Post("logout")
  @HttpCode(200)
  logout(@Req() req: RequestWithUser): void {
    return req.logout();
  }
}
