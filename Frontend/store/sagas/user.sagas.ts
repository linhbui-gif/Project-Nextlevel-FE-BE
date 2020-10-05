/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import axios, { AxiosResponse } from "axios";
import Router from "next/router";
import { put, call, takeLatest } from "redux-saga/effects";
import { AnyAction } from "redux";
import jwtDecode from "jwt-decode";
import {
  receivedUserValidationAction,
  receivedUserAction,
  setUserLoader,
  receivedTokenAction,
} from "../actions";
import { login, signup, forgotPassword, resetPassword } from "../../api";
import { TAuthToken, TUser } from "../../types";
import { genericErrorHandler } from "../../utils/error.utils";
import { createCookie, eraseCookie } from "../../utils/cookies.utils";

export function* setAuthenticationSaga(action: AnyAction) {
  const token: string = action.payload;
  const user: TUser = jwtDecode(token);
  yield put(receivedTokenAction(token));
  yield put(receivedUserAction(user));
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  return user;
}
export function* redirectToDashboard(user) {
  if (user.roles.indexOf("admin") > -1) {
    yield Router.push("/admin");
  } else {
    yield Router.push("/");
  }
}
export function* loginSaga(action: AnyAction) {
  try {
    yield put(receivedUserValidationAction(null));
    const response: AxiosResponse<TAuthToken> = yield call(
      login,
      action.payload
    );
    const token = response.data.access_token;
    const user = yield call(setAuthenticationSaga, {
      type: "",
      payload: token,
    });
    createCookie("token", token, 30);
    yield call(redirectToDashboard, user);
  } catch (e) {
    if (e.response.data.statusCode === 401) {
      yield put(
        receivedUserValidationAction(["Email and password did not match"])
      );
    }
    yield put(setUserLoader(false));
  }
}
export function* signUpSaga(action: AnyAction) {
  try {
    yield put(receivedUserValidationAction(null));
    const response: AxiosResponse<TAuthToken> = yield call(
      signup,
      action.payload
    );
    const token = response.data.access_token;
    const user = yield call(setAuthenticationSaga, {
      type: "",
      payload: token,
    });
    createCookie("token", token, 30);
    yield call(redirectToDashboard, user);
  } catch (e) {
    yield put(setUserLoader(false));
    yield put(receivedUserValidationAction(e.response.data.message));
  }
}
export function* logOutSaga() {
  axios.defaults.headers.common.Authorization = null;
  yield Router.push("/");
  eraseCookie("token");
}
export function* forgotSaga(action: AnyAction) {
  try {
    yield put(receivedUserValidationAction(null));
    yield call(forgotPassword, action.payload);
    // success message
  } catch (e) {
    yield put(setUserLoader(false));
    yield put(receivedUserValidationAction([e.response.data.message]));
  }
}
export function* resetSaga(action: AnyAction) {
  try {
    yield put(receivedUserValidationAction(null));
    const response: AxiosResponse<TAuthToken> = yield call(
      resetPassword,
      action.payload
    );
    const token = response.data.access_token;
    const user = yield call(setAuthenticationSaga, {
      type: "",
      payload: token,
    });
    createCookie("token", token, 30);
    // success message
    yield call(redirectToDashboard, user);
  } catch (e) {
    yield put(setUserLoader(false));
    yield put(receivedUserValidationAction([e.response.data.message]));
  }
}

// SAGAS
export function* UserSaga() {
  yield takeLatest("user/login", genericErrorHandler(loginSaga));
  yield takeLatest("user/restore", genericErrorHandler(setAuthenticationSaga));
  yield takeLatest("user/signup", genericErrorHandler(signUpSaga));
  yield takeLatest("user/logout", genericErrorHandler(logOutSaga));
  yield takeLatest("user/forgot", genericErrorHandler(forgotSaga));
  yield takeLatest("user/reset", genericErrorHandler(resetSaga));
}
