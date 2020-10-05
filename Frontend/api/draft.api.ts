import axios, { AxiosResponse } from "axios";
import { TCreateDraft, TArticle, TUploadedFile } from "../types";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
export const createDraft = (
  draft: TCreateDraft
): Promise<AxiosResponse<TCreateDraft>> =>
  axios.post(`${BASE_URL}/article/draft`, draft);
export const publishArticle = (
  draft: TCreateDraft
): Promise<AxiosResponse<TCreateDraft>> =>
  axios.post(`${BASE_URL}/article/publish`, draft);
export const deleteDraft = (id: string): Promise<AxiosResponse<TCreateDraft>> =>
  axios.delete(`${BASE_URL}/article/draft/${id}`);
export const deleteArticle = (
  id: string
): Promise<AxiosResponse<TCreateDraft>> =>
  axios.delete(`${BASE_URL}/article/${id}`);

export const getDrafts = (): Promise<AxiosResponse<TCreateDraft>> =>
  axios.get(`${BASE_URL}/article/drafts`);
export const getArticles = (): Promise<AxiosResponse<TArticle>> =>
  axios.get(`${BASE_URL}/article`);

export const getDraftById = (
  draftId: string
): Promise<AxiosResponse<TCreateDraft>> =>
  axios.get(`${BASE_URL}/article/draft/${draftId}`);
export const getArticleById = (
  articleId: string
): Promise<AxiosResponse<TArticle>> =>
  axios.get(`${BASE_URL}/article/${articleId}`);
export const uploadArticle = async (
  file: FormData
): Promise<AxiosResponse<TUploadedFile>> =>
  axios.post(`${BASE_URL}/article/upload/cover`, file, {
    headers: {
      Accept: "application/json",
      "Content-Type": "multipart/form-data",
    },
  });
