import {
  BaseEntity,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export abstract class CommonEntity extends BaseEntity {
  @PrimaryGeneratedColumn("uuid", { comment: "식별자" })
  id: string;

  @CreateDateColumn({ comment: "생성 일자" })
  createdAt?: Date | undefined;

  @UpdateDateColumn({ comment: "수정 일자" })
  updatedAt?: Date | undefined;

  @DeleteDateColumn({ comment: "삭제 일자" })
  deletedAt?: Date | undefined;
}
