import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './base.entity';

export type UserRole = "admin" | "editor" | "member";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  public id?: string;

  @Column({ unique: true })
  public email: string;
  
  @Column({ select: false })
  public password?: string;
  
  @Column()
  public firstName: string;
  
  @Column()
  public lastName: string;

  @Column({
    type: "set",
    enum: ["admin", "editor", "member"],
    default: ["member"]
  })
  public roles: UserRole[];

  @Column({ nullable: true })
  public cv?: string;

  @Column({ type: 'text', nullable: true })
  public bio?: string;

  @Column({ select: false, nullable: true })
  public code?: string;
}
