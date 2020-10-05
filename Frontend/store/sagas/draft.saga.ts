import { AnyAction } from "redux";
import { AxiosResponse } from "axios";
import { put, call, takeLatest } from "redux-saga/effects";
import Router from "next/router";
import {
  receivedDraftAction,
  receivedDraftValidationAction,
  setDraftLoader,
  receivedListDraftAction,
  receivedListArticAction,
  receivedArticleAction,
} from "../actions";
import {
  createDraft,
  publishArticle,
  deleteDraft,
  getDrafts,
  getArticles,
  getDraftById,
  getArticleById,
} from "../../api";
import { genericErrorHandler } from "../../utils/error.utils";
import { TCreateDraft } from "../../types";

export function* draftSaga(action: AnyAction): Generator<any, any, any> {
  try {
    yield put(receivedDraftValidationAction(null));
    const response: AxiosResponse<TCreateDraft> = yield call(
      createDraft,
      action.payload
    );
    yield put(receivedDraftAction(response.data));
    if (!action.payload.id && response.data.id) {
      Router.push(
        "/admin/articles/draft/[id]",
        `/admin/articles/draft/${response.data.id}`
      );
    }
  } catch (e) {
    yield put(setDraftLoader(false));
    yield put(receivedDraftValidationAction(e.response.data.message));
  }
}
export function* publishArticleSaga(
  action: AnyAction
): Generator<any, any, any> {
  try {
    yield put(receivedDraftValidationAction(null));
    const response: AxiosResponse<TCreateDraft> = yield call(
      publishArticle,
      action.payload
    );
    const article = response.data;
    const draft = action.payload;
    yield put(
      receivedDraftAction({ ...article, id: draft.id, article: article.id })
    );
    Router.push("/admin/articles");
  } catch (e) {
    yield put(setDraftLoader(false));
    yield put(receivedDraftValidationAction(e.response.data.message));
  }
}
export function* deleteDraftSaga(action: AnyAction): Generator<any, any, any> {
  try {
    yield put(receivedDraftValidationAction(null));
    const response = yield call(deleteDraft, action.payload);
    Router.push("/admin/articles");
    yield put(receivedDraftAction(response.data));
  } catch (e) {
    yield put(setDraftLoader(false));
    yield put(receivedDraftValidationAction(e.response.data.message));
  }
}
export function* getDraftSaga(action: AnyAction): Generator<any, any, any> {
  try {
    const response = yield call(getDraftById, action.payload);
    yield put(receivedDraftAction(response.data));
  } catch (e) {
    yield put(setDraftLoader(false));
    yield put(receivedDraftValidationAction(e.response.data.message));
  }
}
export function* getDraftListSaga(): Generator<any, any, any> {
  try {
    const response = yield call(getDrafts);
    yield put(receivedListDraftAction(response.data));
  } catch (e) {
    yield put(setDraftLoader(false));
  }
}
export function* getArticleSaga(action: AnyAction): Generator<any, any, any> {
  try {
    const response = yield call(getArticleById, action.payload);
    yield put(receivedArticleAction(response.data));
  } catch (e) {
    yield put(setDraftLoader(false));
  }
}
export function* getArticleListSaga(): Generator<any, any, any> {
  try {
    const response = yield call(getArticles);
    yield put(receivedListArticAction(response.data));
  } catch (e) {
    yield put(setDraftLoader(false));
  }
}
// SAGAS
export function* DraftSaga(): Generator<any, any, any> {
  yield takeLatest("draft/save", genericErrorHandler(draftSaga));
  yield takeLatest("draft/publish", genericErrorHandler(publishArticleSaga));
  yield takeLatest("draft/delete", genericErrorHandler(deleteDraftSaga));
  yield takeLatest("draft/request", genericErrorHandler(getDraftSaga));
  yield takeLatest("draft/list", genericErrorHandler(getDraftListSaga));
  yield takeLatest("article/request", genericErrorHandler(getArticleSaga));
  yield takeLatest("article/list", genericErrorHandler(getArticleListSaga));
}
