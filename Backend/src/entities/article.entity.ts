import { Column, Entity, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { User } from './user.entity';
import { Draft } from './draft.entity';

@Entity()
export class Article extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  public id?: string;

  @Column()
  public title: string;

  @Column({ unique: true})
  public slug: string;

  @Column({ type: 'longtext' })
  public body: string;

  @ManyToOne (() => User)
  @JoinColumn()
  public author: User;

  @OneToOne (() => Draft, { eager: true, onDelete: "CASCADE" })
  @JoinColumn()
  public draft: Draft;

  @Column({ type: 'text', nullable: true })
  public coverImage?: string;
}
