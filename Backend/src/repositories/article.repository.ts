import { EntityRepository, Repository } from 'typeorm';
import { Article } from '../entities';
import { ArticleSummaryDto, ArticleCreatedDto } from 'src/dto';

@EntityRepository(Article)
export class ArticleRepository extends Repository<Article> {

  async getArticleSummaries(): Promise<ArticleSummaryDto[]> {
    return this.createQueryBuilder("a")
      .select([
        "a.id", "a.title", "a.draft", "a.updatedDate", "a.slug",
        "user.id", "user.firstName", "user.lastName"
      ])
      .leftJoin("a.author", "user")
      .getMany() as unknown as ArticleSummaryDto[];
  }

  async getArticleDetail(id: string): Promise<ArticleCreatedDto> {
    return this.createQueryBuilder("a")
      .select([
        "a.id", "a.title", "a.draft", "a.updatedDate", "a.slug",
        "user.id", "user.firstName", "user.lastName"
      ])
      .leftJoin("a.author", "user")
      .where("a.id = :id", { id })
      .getOne();
  }
}
