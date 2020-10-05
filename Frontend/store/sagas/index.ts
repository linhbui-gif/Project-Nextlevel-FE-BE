import { fork, all } from "redux-saga/effects";
import { UserSaga } from "./user.sagas";
import { ProjectSaga } from "./project.sagas";
import { DraftSaga } from "./draft.saga";

export default function* rootSaga(): Generator<any, any, any> {
  yield all([fork(UserSaga), fork(ProjectSaga), fork(DraftSaga)]);
}
