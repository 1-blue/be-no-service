import { Strategy } from "passport-local";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";

import { AuthService } from "src/v1/auth/auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, "local") {
  constructor(private authService: AuthService) {
    super({ usernameField: "email", passwordField: "password" });
  }

  async validate(email: string, password: string) {
    const user = await this.authService.validateUser(email, password);

    // 비밀번호 제외
    delete user.password;

    return user;
  }
}
