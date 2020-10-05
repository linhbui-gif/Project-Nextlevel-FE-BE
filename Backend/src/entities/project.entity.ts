import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity()
export class Project extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  public id?: string;

  @Column({ unique: true })
  public name: string;

  @Column({ type: 'longtext' })
  public description: string;

  @Column({ type: "simple-array" })
  public imageGallery: string[];
}
