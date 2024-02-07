import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { FindManyOptions, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

import { Cat } from "src/v1/cats/entities/cat.entity";
import { CreateCatDto } from "src/v1/cats/dto/create-cat.dto";
import { UpdateCatDto } from "src/v1/cats/dto/update-cat.dto";

@Injectable()
export class CatsService {
  constructor(
    @InjectRepository(Cat) private readonly catsRepository: Repository<Cat>,
  ) {}

  /** 고양이 생성 */
  async create(cat: CreateCatDto) {
    await this.hasDuplicateName(cat.name);

    const createdCat = this.catsRepository.create(cat);

    return await this.catsRepository.save(createdCat);
  }

  /** 모든 고양이들 찾기 */
  async findAll(options?: FindManyOptions<Cat>) {
    return await this.catsRepository.find(options);
  }

  /** 특정 고양이 찾기 */
  async findOne(id: string) {
    const exCat = await this.catsRepository.findOneBy({ id });
    if (!exCat) throw new NotFoundException("찾는 고양이가 존재하지 않습니다.");

    return exCat;
  }

  /** 특정 고양이 수정 */
  async update(id: string, cat: UpdateCatDto) {
    await this.findOne(id);

    await this.hasDuplicateName(cat.name);

    return await this.catsRepository.update(id, cat);
  }

  /** 특정 고양이 삭제 */
  async delete(id: string) {
    await this.findOne(id);

    return await this.catsRepository.delete(id);
  }

  /** 고양이 이름 중복 여부 확인 ( 이미 존재하면 에러 던짐 ) */
  async hasDuplicateName(name: string) {
    const exCat = await this.catsRepository.findOneBy({ name });

    if (!!exCat) throw new ConflictException("이미 사용중인 이름입니다.");
  }
}
