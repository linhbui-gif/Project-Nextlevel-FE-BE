import { EntityRepository, Repository } from 'typeorm';
import { Draft } from '../entities';
import { DraftCreatedDto } from '../dto';

@EntityRepository(Draft)
export class DraftRepository extends Repository<Draft> {

  async getDrafts(userId: string): Promise<DraftCreatedDto[]> {
    return this.createQueryBuilder("d")
      .select([
        "d.id", "d.title", "d.slug", "d.updatedDate", "d.article",
        "user.id", "user.firstName", "user.lastName"
      ])
      .leftJoin("d.author", "user")
      .where("d.author = :userId", { userId })
      .andWhere("d.author = user.id")
      .getMany();
  }
}
