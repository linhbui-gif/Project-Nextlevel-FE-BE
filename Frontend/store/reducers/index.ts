import { combineReducers } from "redux";
import users, { UserState } from "./user.reducers";
import projects, { ProjectState } from "./project.reducers";
import notifications, { NotificationState } from "./notification.reducers";
import drafts, { DraftState } from "./draft.reducers";

export interface AppState {
  users: UserState;
  projects: ProjectState;
  notifications: NotificationState;
  drafts: DraftState;
}

const reducer = combineReducers({
  users,
  projects,
  notifications,
  drafts,
});

export default reducer;
