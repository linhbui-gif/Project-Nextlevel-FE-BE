import { Column, Entity, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { User } from './user.entity';
import { Article } from './article.entity';

@Entity()
export class Draft extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  public id?: string;

  @OneToOne (() => Article, { onDelete: "SET NULL" })
  @JoinColumn()
  public article: Article;

  @Column()
  public title: string;

  @Column({ unique: true})
  public slug: string;

  @Column({ type: 'longtext' })
  public body: string;

  @ManyToOne (() => User)
  @JoinColumn()
  public author: User;

  @Column({ type: 'text', nullable: true })
  public coverImage?: string;
}
