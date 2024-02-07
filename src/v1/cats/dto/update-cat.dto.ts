import { PartialType } from "@nestjs/mapped-types";

import { CreateCatDto } from "src/v1/cats/dto/create-cat.dto";

export class UpdateCatDto extends PartialType(CreateCatDto) {}
