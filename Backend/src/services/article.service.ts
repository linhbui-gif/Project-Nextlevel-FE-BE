import { Injectable } from '@nestjs/common';
import { ArticleRepository, DraftRepository } from 'src/repositories';
import { ArticleSummaryDto, DraftDto, ArticleCreatedDto } from 'src/dto';
import { DeleteResult } from 'typeorm';
import { DraftCreatedDto } from 'src/dto/draft.created.dto';
import { ArticleUrlNotUnique, AuthorDoesNotExist, ArticleAlreadyHasDraft } from 'src/errors';
import { ArticleNotFound } from 'src/errors/article-not-found.error';

@Injectable()
export class ArticleService {
  constructor(
    private articleRepository: ArticleRepository,
    private draftRepository: DraftRepository
  ) {}

  async getArticleById(id: string): Promise<ArticleCreatedDto> {
    const article = await this.articleRepository.getArticleDetail(id);
    console.log("getArticleById", id, article);
    if (!article) {
      throw new ArticleNotFound();
    }
    return article;
  }

  getArticles(): Promise<ArticleSummaryDto[]> {
    return this.articleRepository.getArticleSummaries();
  }

  getDrafts(userId: string): Promise<DraftCreatedDto[]> {
    return this.draftRepository.getDrafts(userId);
  }

  getDraftById(id: string): Promise<DraftCreatedDto> {
    return this.draftRepository.findOne(id);
  }

  async saveDraft(draft: any): Promise<DraftCreatedDto> {
    try {
      return await this.draftRepository.save(draft);
    } catch(e) {
      if (e.message.indexOf('IDX_835c720ebaab50750089a7567f') > -1) {
        throw new ArticleUrlNotUnique();
      }
      if (e.message.indexOf('REL_46c1f65a7feaeb3558dec4a72d') > -1) {
        throw new ArticleAlreadyHasDraft();
      }
      if (e.message.indexOf('FK_87eeb049832589bb723934177e6') > -1) {
        throw new AuthorDoesNotExist();
      }
      return e;
    }
  }

  async publishDraft(draft: DraftDto) {
    try {
      const { id, author, ...newArticle} = draft;
      if (id) {
        await this.draftRepository.delete(id);
      }
      return await this.articleRepository.save({...newArticle, id: draft.article, author: { id: author }});
    } catch(e) {
      if (e.message.indexOf('IDX_0ab85f4be07b22d79906671d72') > -1) {
        throw new ArticleUrlNotUnique();
      }
      if (e.message.indexOf('FK_a9c5f4ec6cceb1604b4a3c84c87') > -1) {
        throw new AuthorDoesNotExist();
      }
      return e;
    }
  }

  async deleteArticle(id: string): Promise<DeleteResult | any> {
    // const article = await this.articleRepository.findOne(id);
    // if (article.draft) {
    //   await this.draftRepository.delete(article.draft);
    // }
    return await this.articleRepository.delete(id);
  }
  
  deleteDraft(id: string): Promise<DeleteResult> {
    return this.draftRepository.delete(id);
  }
}
