import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOptionsSelect, Repository } from "typeorm";

import { compareValue, encryptionValue } from "src/utils";
import { User } from "src/v1/users/entities/user.entity";
import { CreateUserDto } from "src/v1/users/dto/create-user.dto";
import { UpdateUserDto } from "src/v1/users/dto/update-user.dto";

/** `password`를 제외한 선택 옵션 */
const userSelect: FindOptionsSelect<User> = {
  id: true,
  createdAt: true,
  updatedAt: true,
  deletedAt: true,
  email: true,
  nickname: true,
  phone: true,
  money: true,
  role: true,
  provider: true,
  providerId: true,
  image: true,
};

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {}

  async create(userData: CreateUserDto) {
    // email 중복 검사
    await this.hasDuplicateEmail(userData.email);

    // nickname 중복 검사
    await this.hasDuplicateNickname(userData.nickname);

    // phone 중복 검사
    if (userData.phone) await this.hasDuplicatePhone(userData.phone);

    // password 암호화
    const hashedPassword = await encryptionValue(userData.password);

    const user = this.usersRepository.create({
      ...userData,
      password: hashedPassword,
    });

    return await this.usersRepository.save(user);
  }

  async findAll() {
    return await this.usersRepository.find({ select: userSelect });
  }

  async findOne(id: string) {
    // 유저 존재 여부 확인
    const exUser = await this.usersRepository.findOne({
      where: { id },
      select: userSelect,
    });
    if (!exUser) throw new NotFoundException("찾는 유저가 존재하지 않습니다.");

    return exUser;
  }

  async update(id: string, userData: UpdateUserDto) {
    // 유저 존재 여부 확인
    await this.findOne(id);

    // 기존 데이터와 수정할 데이터 중복 여부 확인
    if (userData.email) await this.hasDuplicateEmail(userData.email);
    if (userData.nickname) await this.hasDuplicateNickname(userData.nickname);
    if (userData.phone) await this.hasDuplicatePhone(userData.phone);

    return await this.usersRepository.update(id, userData);
  }

  async delete(id: string) {
    // 유저 존재 여부 확인
    await this.findOne(id);

    return await this.usersRepository.delete(id);
  }

  /** 이메일 중복 검사 */
  async hasDuplicateEmail(email: string) {
    const exUser = await this.usersRepository.findOneBy({ email });

    if (exUser) throw new ConflictException("이미 사용중인 이메일입니다.");
  }

  /** 닉네임 중복 검사 */
  async hasDuplicateNickname(nickname: string) {
    const exUser = await this.usersRepository.findOneBy({ nickname });

    if (exUser) throw new ConflictException("이미 사용중인 닉네임입니다.");
  }

  /** 휴대폰 번호 중복 검사 */
  async hasDuplicatePhone(phone: string) {
    const exUser = await this.usersRepository.findOneBy({ phone });

    if (exUser) throw new ConflictException("이미 사용중인 휴대폰 번호입니다.");
  }

  /** 이메일 & 비밀번호를 이용해서 유효한 유저인지 검증 */
  async validate(email: string, password: string) {
    const exUser = await this.usersRepository.findOneBy({
      email,
    });

    if (!exUser) {
      throw new UnauthorizedException(
        "이메일 혹은 비밀번호가 유효하지 않습니다.",
      );
    }

    const isPasswordMatch = await compareValue(password, exUser.password);

    if (!isPasswordMatch) {
      throw new UnauthorizedException(
        "이메일 혹은 비밀번호가 유효하지 않습니다.",
      );
    }

    return exUser;
  }

  /** TODO: 테스트 코드 */
  /** OAuth 로그인된 기록 기반으로 유저 정보 찾기 */
  async findOneByProviderId(providerId: string) {
    const exUser = await this.usersRepository.findOne({
      where: { providerId },
      select: userSelect,
    });

    return exUser;
  }
}
