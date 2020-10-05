import { TUserSummary, TBaseEntity } from ".";

export type TCreateDraft = {
  id?: string;
  title: string;
  body: string;
  slug: string;
  author: string;
  article?: string;
  coverImage: string;
};
export type TDraft = TBaseEntity & TCreateDraft;

export type TDraftDetail = TBaseEntity & {
  id: string;
  title: string;
  body: string;
  slug: string;
  author: TUserSummary;
  article?: string;
};

export type TArticle = {
  id?: string;
  title: string;
  body: string;
  slug: string;
  author: string;
};
export type TArticleDetail = TBaseEntity & {
  id: string;
  title: string;
  body: string;
  slug: string;
  author: TUserSummary;
};
export type TArticleList = TArticleDetail[];
export type TDraftList = TDraftDetail[];
export type TDraftValidation = string[];
