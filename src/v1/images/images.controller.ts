import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from "@nestjs/common";

import { ImagesService } from "src/v1/images/images.service";
import { CreateImageDto } from "src/v1/images/dto/create-image.dto";
import { FindOneImageDto } from "src/v1/images/dto/find-one-image.dto";
import { MoveImageDto } from "src/v1/images/dto/move-image.dto";
import { DeleteImageDto } from "src/v1/images/dto/delete-image.dto";
import { CreatePresignedURLDto } from "src/v1/images/dto/create-presinged-url.dto";

@Controller("api/v1/images")
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Post()
  create(@Body() createDto: CreateImageDto) {
    return this.imagesService.create(createDto);
  }

  @Get(":id")
  findOne(@Param() findOneImageDto: FindOneImageDto) {
    return this.imagesService.findOne(findOneImageDto);
  }

  @Patch()
  move(@Body() moveDto: MoveImageDto) {
    return this.imagesService.move(moveDto);
  }

  @Delete()
  delete(@Body() deleteS3Dto: DeleteImageDto) {
    return this.imagesService.delete(deleteS3Dto);
  }

  @Post("/presigned-url")
  createPresignedURL(@Body() createPresignedURLDto: CreatePresignedURLDto) {
    return this.imagesService.createPresignedURL(createPresignedURLDto);
  }
}
