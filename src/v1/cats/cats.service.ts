import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { Prisma } from "@prisma/client";

import { PrismaService } from "src/v0/prisma/prisma.service";
import { CreateCatDto } from "src/v1/cats/dto/create-cat.dto";
import { UpdateCatDto } from "src/v1/cats/dto/update-cat.dto";

@Injectable()
export class CatsService {
  /** 연결된 이미지 가져오는 옵션값 */
  private commonInclude: Prisma.CatInclude = {
    image: {
      select: {
        id: true,
        url: true,
        name: true,
        status: true,
      },
    },
  };

  constructor(private readonly prismaService: PrismaService) {}

  /** 고양이 생성 */
  async create({ imageId, ...cat }: CreateCatDto) {
    await this.hasDuplicateName(cat.name);

    return await this.prismaService.cat.create({
      data: {
        ...cat,
        // 연결된 이미지
        image: {
          // 공용으로 사용하기 위해서 S3에 등록해둔 아바타 이미지 ( `11111111-1111-1111-1111-111111111111` )
          connectOrCreate: {
            where: {
              id: imageId || "11111111-1111-1111-1111-111111111111",
            },
            create: {
              id: "11111111-1111-1111-1111-111111111111",
              url: "https://no-service.s3.ap-northeast-2.amazonaws.com/images/default/avatar1.png",
              name: "avatar1.png",
            },
          },
        },
      },
      include: this.commonInclude,
    });
  }

  /** 모든 고양이들 찾기 */
  async findAll() {
    return await this.prismaService.cat.findMany({
      include: this.commonInclude,
    });
  }

  /** 특정 고양이 찾기 */
  async findOne(id: string) {
    const exCat = await this.prismaService.cat.findUnique({
      where: { id },
      include: this.commonInclude,
    });
    if (!exCat) throw new NotFoundException("찾는 고양이가 존재하지 않습니다.");

    return exCat;
  }

  /** 특정 고양이 수정 */
  async update(id: string, { imageId, ...cat }: UpdateCatDto) {
    await this.findOne(id);

    await this.hasDuplicateName(cat.name);

    return await this.prismaService.cat.update({
      where: { id },
      data: {
        ...cat,
        // 연결된 이미지
        image: {
          connectOrCreate: {
            // 공용으로 사용하기 위해서 S3에 등록해둔 아바타 이미지 ( `11111111-1111-1111-1111-111111111111` )
            where: {
              id: "11111111-1111-1111-1111-111111111111",
            },
            create: {
              id: imageId || "11111111-1111-1111-1111-111111111111",
              url: "https://no-service.s3.ap-northeast-2.amazonaws.com/images/default/avatar1.png",
              name: "avatar1.png",
            },
          },
        },
      },
      include: this.commonInclude,
    });
  }

  /** 특정 고양이 삭제 */
  async delete(id: string) {
    await this.findOne(id);

    return await this.prismaService.cat.delete({
      where: { id },
      include: this.commonInclude,
    });
  }

  /** 고양이 이름 중복 여부 확인 ( 이미 존재하면 에러 던짐 ) */
  async hasDuplicateName(name: string) {
    const exCat = await this.prismaService.cat.findUnique({ where: { name } });

    if (!!exCat) throw new ConflictException("이미 사용중인 이름입니다.");
  }
}
