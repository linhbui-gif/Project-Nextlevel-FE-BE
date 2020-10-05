// @flow
import { put, call } from "redux-saga/effects";
import { Saga } from "redux-saga";
import { AnyAction } from "redux";
import {
  createHandleErrorAction,
  createHandleServerErrorAction,
  createHandleNetworkErrorAction,
  createHandleOtherErrorAction,
} from "../store/actions";

export function* handleError(...err: any): Generator<any, any, any> {
  yield put(createHandleErrorAction(err));

  if (err.response) {
    yield put(createHandleServerErrorAction(err));
  } else if (err.message === "Network Error" || err.code === "ECONNABORTED") {
    yield put(createHandleNetworkErrorAction(err));
  } else {
    yield put(createHandleOtherErrorAction(err));
  }
}

export const genericErrorHandler = (saga: Saga, ...args: any) =>
  function* handleApp(action: AnyAction): Generator<any, any, any> {
    try {
      yield call(saga, ...args, action);
    } catch (err) {
      yield call(handleError, ...args, err);
    }
  };
