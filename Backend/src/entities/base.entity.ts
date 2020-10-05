import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

export class BaseEntity {
  @CreateDateColumn()
  public createdDate?: Date;

  @UpdateDateColumn()
  public updatedDate?: Date;
}
