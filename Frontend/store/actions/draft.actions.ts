import { AnyAction } from "redux";
import { TCreateDraft, TDraftValidation } from "../../types";

export const saveDraftAction = (payload: TCreateDraft): AnyAction => ({
  type: "draft/save",
  payload,
});
export const publishDraftAction = (payload: TCreateDraft): AnyAction => ({
  type: "draft/publish",
  payload,
});
export const requestDraftAction = (payload: string): AnyAction => ({
  type: "draft/request",
  payload,
});
export const receivedDraftAction = (payload: TCreateDraft): AnyAction => ({
  type: "draft/received",
  payload,
});
export const requestArticleAction = (payload: string): AnyAction => ({
  type: "article/request",
  payload,
});
export const receivedArticleAction = (payload: TCreateDraft): AnyAction => ({
  type: "article/received",
  payload,
});
export const receivedDraftValidationAction = (
  payload: TDraftValidation
): AnyAction => ({
  type: "draft/validation",
  payload,
});
export const setDraftLoader = (payload: boolean): AnyAction => ({
  type: "draft/loader",
  payload,
});
export const deleteDraftAction = (payload: string): AnyAction => ({
  type: "draft/delete",
  payload,
});
export const requestListDraftAction = (): AnyAction => ({
  type: "draft/list",
});
export const receivedListDraftAction = (payload: string): AnyAction => ({
  type: "draft/receivedList",
  payload,
});
export const requestListArticleAction = (): AnyAction => ({
  type: "article/list",
});
export const receivedListArticAction = (payload: string): AnyAction => ({
  type: "article/receivedList",
  payload,
});
export const deleteDraftReceived = (payload: string): AnyAction => ({
  type: "draft/deleteReceived",
  payload,
});
export const deleteArticleAction = (payload: string): AnyAction => ({
  type: "article/delete",
  payload,
});
