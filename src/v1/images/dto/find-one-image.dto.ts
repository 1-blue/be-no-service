import { IsNotEmpty, IsUUID } from "class-validator";

export class FindOneImageDto {
  @IsNotEmpty({ message: "이미지의 식별자는 필수값입니다." })
  @IsUUID(null, { message: "UUID 형태만 입력이 가능합니다." })
  id: string;
}
