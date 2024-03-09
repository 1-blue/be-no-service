import {
  IsOptional,
  IsNotEmpty,
  IsUUID,
  IsString,
  IsNumber,
  IsBoolean,
} from "class-validator";

export class CreateCatDto {
  @IsOptional()
  @IsUUID()
  id?: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  age: number;

  @IsOptional()
  @IsBoolean()
  gender?: boolean;

  @IsOptional()
  @IsUUID()
  imageId?: string;
}
