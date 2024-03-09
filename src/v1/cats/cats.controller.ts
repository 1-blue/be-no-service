import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
} from "@nestjs/common";

import { CatsService } from "src/v1/cats/cats.service";
import { CreateCatDto } from "src/v1/cats/dto/create-cat.dto";
import { UpdateCatDto } from "src/v1/cats/dto/update-cat.dto";

@Controller("api/v1/cats")
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Post()
  @HttpCode(201)
  create(@Body() createCatDto: CreateCatDto) {
    return this.catsService.create(createCatDto);
  }

  @Get()
  findAll() {
    return this.catsService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.catsService.findOne(id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateCatDto: UpdateCatDto) {
    return this.catsService.update(id, updateCatDto);
  }

  @Delete(":id")
  delete(@Param("id") id: string) {
    return this.catsService.delete(id);
  }
}
