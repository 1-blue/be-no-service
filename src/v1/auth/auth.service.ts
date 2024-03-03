import { Injectable } from "@nestjs/common";

import { UsersService } from "src/v1/users/users.service";

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(email: string, password: string) {
    return await this.usersService.validate(email, password);
  }
}
