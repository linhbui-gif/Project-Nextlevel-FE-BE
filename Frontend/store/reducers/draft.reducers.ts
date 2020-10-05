import { AnyAction } from "redux";
import { HYDRATE } from "next-redux-wrapper";
import {
  TCreateDraft,
  TDraftValidation,
  TDraftList,
  TArticleList,
  TArticleDetail,
} from "../../types";

export interface DraftState {
  draft?: TCreateDraft;
  article?: TArticleDetail;
  loading: boolean;
  draftList?: TDraftList;
  articleList?: TArticleList;
  validation?: TDraftValidation;
}

const initState: DraftState = {
  draft: undefined,
  article: undefined,
  loading: false,
  draftList: undefined,
  articleList: undefined,
  validation: undefined,
};

const reducer = (
  state: DraftState = initState,
  action: AnyAction
): DraftState => {
  switch (action.type) {
    case HYDRATE:
      return { ...state, ...action.payload.drafts };
    case "draft/save":
      return { ...state, loading: true };
    case "draft/list":
      return { ...state, loading: true };
    case "draft/receivedList":
      return { ...state, draftList: action.payload, loading: false };
    case "article/list":
      return { ...state, loading: true };
    case "article/request":
      return { ...state, loading: true };
    case "article/received":
      return { ...state, article: action.payload, loading: false };
    case "article/receivedList":
      return { ...state, articleList: action.payload, loading: false };
    case "draft/publish":
      return { ...state, loading: true };
    case "draft/delete":
      return { ...state, loading: true };
    case "draft/deleteReceived":
      return { ...state, draft: action.payload, loading: false };
    case "draft/received":
      return { ...state, draft: action.payload, loading: false };
    case "draft/validation":
      return { ...state, validation: action.payload };
    case "draft/loader":
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};
export default reducer;
