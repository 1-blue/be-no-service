import { IsEnum, IsNotEmpty, IsUUID } from "class-validator";
import { Transform } from "class-transformer";
import { ImageStatus } from "@prisma/client";

export class DeleteImageDto {
  @IsNotEmpty({ message: "이미지 식별자는 필수값입니다." })
  @IsUUID(null, { message: "UUID 형태만 입력이 가능합니다." })
  id: string;

  @IsNotEmpty({ message: "변경전 상태는 필수값입니다." })
  @IsEnum(ImageStatus, { message: "유효하지 않은 이미지 상태입니다." })
  @Transform(({ value }) => value.toLowerCase())
  beforeStatus: Exclude<Lowercase<ImageStatus>, "default">;
}
