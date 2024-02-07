import { Column, Entity } from "typeorm";

import { CommonEntity } from "src/common/entity";

@Entity()
export class Cat extends CommonEntity {
  @Column("varchar", { comment: "고양이 이름", unique: true })
  name: string;

  @Column("int", { comment: "고양이 나이" })
  age: number;

  @Column("boolean", { comment: "고양이 성별", default: true })
  gender: boolean;
}
