import type { Request } from "express";
import type { User } from "src/v1/users/entities/user.entity";

/** 로그인된 유저 데이터를 가지고 있는 `request` */
export interface RequestWithUser extends Request {
  user: Omit<User, "password">;
  /** `passport`에서 제공해주는 로그아웃 메서드 */
  logout: () => void;
}
