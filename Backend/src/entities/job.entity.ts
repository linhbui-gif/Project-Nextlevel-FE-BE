import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity()
export class Job extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  public id?: string;

  @Column()
  public name: string;

  @Column()
  public description: string;

  @Column()
  public requirements: string;

  @Column()
  public skills: string;

  @Column()
  public interview: string;

  @Column()
  public location: string;
  
  @Column({ type: "int" })
  public minSalary: number;
  
  @Column({ type: "int" })
  public maxSalary: number;
  
  @Column({
    type: "enum",
    enum: ["VND", "EUR", "USD", "SGD"],
    default: "VND"
  })
  public currency: string;

  @Column({
    type: "enum",
    enum: ["fulltime", "contractor", "parttime", "internship"],
    default: "fulltime"
  })
  public type: string;

  @Column({ type: "int" })
  public minExperience: number;

  @Column({ type: "int" })
  public maxExperience: number;
}
