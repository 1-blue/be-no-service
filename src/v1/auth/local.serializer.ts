import { Injectable } from "@nestjs/common";
import { PassportSerializer } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { User } from "src/v1/users/entities/user.entity";

@Injectable()
export class LocalSerializer extends PassportSerializer {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {
    super();
  }

  /** [최초 로그인 시 실행] 세션에 저장해둘 값 지정 */
  serializeUser(user: User, done: CallableFunction) {
    done(null, user.id);
  }

  /** [로그인 세션 쿠키가 들어온 경우 실행] `serializeUser()`에서 저장한 값을 받아서 전체 정보 탐색 ( `req.user`로 들어감 ) */
  async deserializeUser(id: string, done: CallableFunction) {
    await this.usersRepository
      .findOneBy({ id })
      .then((user) => {
        delete user.password;
        done(null, user);
      })
      .catch((error) => done(error));

    return;
  }
}
