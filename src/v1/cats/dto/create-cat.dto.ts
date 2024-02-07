import { Optional } from "@nestjs/common";
import { IsNotEmpty } from "class-validator";

export class CreateCatDto {
  @Optional()
  id?: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  age: number;

  @Optional()
  gender?: boolean;
}
