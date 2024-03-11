import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { Prisma } from "@prisma/client";

import { compareValue, encryptionValue } from "src/utils";
import { PrismaService } from "src/v0/prisma/prisma.service";
import { CreateUserDto } from "src/v1/users/dto/create-user.dto";
import { FindByIdDto } from "src/dto/find-by-id.dto";
import { UpdateUserDto } from "src/v1/users/dto/update-user.dto";
import { CheckEmailDto } from "src/v1/users/dto/check-email.dto";
import { CheckNicknameDto } from "src/v1/users/dto/check-nickname.dto";
import { CheckPhoneDto } from "src/v1/users/dto/check-phone.dto";
import { ValidateUserDto } from "src/v1/users/dto/validate-user.dto";

@Injectable()
export class UsersService {
  /** `password`를 제외한 선택 옵션 */
  private readonly userSelectWithoutPassword: Prisma.UserSelect = {
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

  constructor(private readonly prismaService: PrismaService) {}

  async create(user: CreateUserDto) {
    // email 중복 검사
    await this.hasDuplicateEmail({ email: user.email });

    // nickname 중복 검사
    await this.hasDuplicateNickname({ nickname: user.nickname });

    // phone 중복 검사
    if (user.phone) await this.hasDuplicatePhone({ phone: user.phone });

    // password 암호화
    const hashedPassword = await encryptionValue(user.password);

    return await this.prismaService.user.create({
      data: {
        ...user,
        password: hashedPassword,
        money: user.money || 1_000,
        role: user.role || "USER",
        provider: user.provider || "LOCAL",
        imageId: user.imageId,
      },
      select: this.userSelectWithoutPassword,
    });
  }

  async findAll() {
    return await this.prismaService.user.findMany({
      select: this.userSelectWithoutPassword,
    });
  }

  async findOne({ id }: FindByIdDto) {
    // 유저 존재 여부 확인
    const exUser = await this.prismaService.user.findUnique({
      where: { id },
      select: this.userSelectWithoutPassword,
    });
    if (!exUser) throw new NotFoundException("찾는 유저가 존재하지 않습니다.");

    return exUser;
  }

  async update({ id }: FindByIdDto, user: UpdateUserDto) {
    // 유저 존재 여부 확인
    await this.findOne({ id });

    // 기존 데이터와 수정할 데이터 중복 여부 확인
    if (user.email) {
      await this.hasDuplicateEmail({ email: user.email });
    }
    if (user.nickname) {
      await this.hasDuplicateNickname({ nickname: user.nickname });
    }
    if (user.phone) {
      await this.hasDuplicatePhone({ phone: user.phone });
    }

    return await this.prismaService.user.update({
      where: { id },
      data: user,
      select: this.userSelectWithoutPassword,
    });
  }

  async delete({ id }: FindByIdDto) {
    // 유저 존재 여부 확인
    await this.findOne({ id });

    return await this.prismaService.user.delete({
      where: { id },
      select: this.userSelectWithoutPassword,
    });
  }

  /** 이메일 중복 검사 */
  async hasDuplicateEmail({ email }: CheckEmailDto) {
    const exUser = await this.prismaService.user.findUnique({
      where: { email },
    });

    if (exUser) throw new ConflictException("이미 사용중인 이메일입니다.");
  }

  /** 닉네임 중복 검사 */
  async hasDuplicateNickname({ nickname }: CheckNicknameDto) {
    const exUser = await this.prismaService.user.findUnique({
      where: { nickname },
    });

    if (exUser) throw new ConflictException("이미 사용중인 닉네임입니다.");
  }

  /** 휴대폰 번호 중복 검사 */
  async hasDuplicatePhone({ phone }: CheckPhoneDto) {
    const exUser = await this.prismaService.user.findUnique({
      where: { phone },
    });

    if (exUser) throw new ConflictException("이미 사용중인 휴대폰 번호입니다.");
  }

  /** 이메일 & 비밀번호를 이용해서 유효한 유저인지 검증 */
  async validate({ email, password }: ValidateUserDto) {
    const exUser = await this.prismaService.user.findUnique({
      where: { email },
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

    delete exUser.password;

    return exUser;
  }

  /** TODO: 테스트 코드 */
  /** OAuth 로그인된 기록 기반으로 유저 정보 찾기 */
  async findOneByProviderId(providerId: string) {
    const exUser = await this.prismaService.user.findUnique({
      where: { providerId },
      select: this.userSelectWithoutPassword,
    });

    return exUser;
  }
}