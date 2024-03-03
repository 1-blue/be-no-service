import { Optional } from "@nestjs/common";
import { IsNotEmpty } from "class-validator";

import { UserProvider, UserRole } from "src/v1/users/entities/user.entity";

export class CreateUserDto {
  @Optional()
  id?: string;

  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  nickname: string;

  @Optional()
  phone?: string;

  @Optional()
  money?: number;

  @Optional()
  role?: UserRole;

  @Optional()
  provider?: UserProvider;

  @Optional()
  providerId?: string;

  @Optional()
  image?: string;
}
