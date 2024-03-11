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
import { FindByIdDto } from "src/dto/find-by-id.dto";
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
  findOne(@Param() fineByIdDto: FindByIdDto) {
    return this.imagesService.findOne(fineByIdDto);
  }

  @Patch(":id")
  move(@Param() findByIdDto: FindByIdDto, @Body() moveDto: MoveImageDto) {
    return this.imagesService.move(findByIdDto, moveDto);
  }

  @Delete(":id")
  delete(
    @Param() findByIdDto: FindByIdDto,
    @Body() deleteS3Dto: DeleteImageDto,
  ) {
    return this.imagesService.delete(findByIdDto, deleteS3Dto);
  }

  @Post("/presigned-url")
  createPresignedURL(@Body() createPresignedURLDto: CreatePresignedURLDto) {
    return this.imagesService.createPresignedURL(createPresignedURLDto);
  }
}
