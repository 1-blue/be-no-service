import { OmitType, PartialType } from "@nestjs/mapped-types";

import { CreateUserDto } from "src/v1/users/dto/create-user.dto";

export class UpdateUserDto extends PartialType(
  OmitType(CreateUserDto, ["id", "password"]),
) {}