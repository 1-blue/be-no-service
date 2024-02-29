import { Column, Entity } from "typeorm";

import { CommonEntity } from "src/common/entity";

/**
 * + `admin`: 관리자
 * + `manager`: 일부 권한을 부여받은 유저
 * + `user`: 일반 유저
 * + `guest`: 로그인하지 않고 체험으로 사용하는 유저 ( 1일 )
 */
export type UserRole = "admin" | "manager" | "user" | "guest";
const role: UserRole[] = ["admin", "manager", "user", "guest"];

@Entity()
export class User extends CommonEntity {
  @Column("varchar", { comment: "이메일", unique: true })
  email: string;

  @Column("varchar", { comment: "비밀번호", unique: true })
  password: string;

  @Column("varchar", { comment: "닉네임 ( 별칭 )", unique: true })
  nickname: string;

  @Column("varchar", { comment: "휴대폰 번호", unique: true, nullable: true })
  phone?: string;

  @Column("int", { comment: "소유한 금액", default: 1_000 })
  money?: number;

  @Column("enum", {
    enum: role,
    enumName: "role",
    comment: "유저 역할",
    default: "guest",
  })
  role?: UserRole;
}
