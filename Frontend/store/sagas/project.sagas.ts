import { call, put, takeEvery } from "redux-saga/effects";
import { AnyAction } from "redux";
import {
  createProject,
  requestProjectList,
  requestProject,
  editProject,
  deleteProject,
} from "../../api";
import { genericErrorHandler } from "../../utils/error.utils";
import {
  receivedProjectAction,
  receivedProjectListAction,
  setProjectLoader,
  setProjectListLoader,
  addNotificationAction,
} from "../actions";

export function* createProjectSaga(
  action: AnyAction
): Generator<any, any, any> {
  try {
    const response = yield call(createProject, action.payload);
    yield put(receivedProjectAction(response.data));
    yield put(addNotificationAction(response.statusText));
  } finally {
    yield put(setProjectLoader(false));
  }
}

export function* requestProjectSaga(
  action: AnyAction
): Generator<any, any, any> {
  try {
    const response = yield call(requestProject, action.payload);
    yield put(receivedProjectAction(response.data));
  } finally {
    yield put(setProjectLoader(false));
  }
}
export function* editProjectSaga(action: AnyAction): Generator<any, any, any> {
  try {
    const response = yield call(editProject, action.payload);
    yield put(receivedProjectAction(response.data));
    yield put(addNotificationAction(response.statusText));
  } catch (e) {
    yield put(addNotificationAction(e));
  } finally {
    yield put(setProjectLoader(false));
  }
}

export function* requestProjectListSaga(): Generator<any, any, any> {
  try {
    const response = yield call(requestProjectList);
    yield put(receivedProjectListAction(response.data));
  } finally {
    yield put(setProjectListLoader(false));
  }
}

export function* deleteProjectSaga(
  action: AnyAction
): Generator<any, any, any> {
  try {
    const response = yield call(deleteProject, action.payload);
    if (response.data.affected === 1) {
      yield call(requestProjectListSaga);
    }
  } finally {
    yield put(setProjectListLoader(false));
  }
}

export function* ProjectSaga(): Generator<any, any, any> {
  yield takeEvery("project/new", genericErrorHandler(createProjectSaga));
  yield takeEvery("projects/list", genericErrorHandler(requestProjectListSaga));
  yield takeEvery("project/id", genericErrorHandler(requestProjectSaga));
  yield takeEvery("project/edit", genericErrorHandler(editProjectSaga));
  yield takeEvery("project/delete", genericErrorHandler(deleteProjectSaga));
}
