import type { User as UserType } from "src/v1/users/entities/user.entity";

declare global {
  namespace Express {
    interface User
      extends Omit<
        UserType,
        | "password"
        | "save"
        | "softRemove"
        | "hasId"
        | "recover"
        | "reload"
        | "remove"
      > {}
  }
}
