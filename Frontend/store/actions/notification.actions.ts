import { AnyAction } from "redux";

export const addNotificationAction = (payload: string): AnyAction => ({
  type: "notification/add",
  payload,
});
export const removeNotificationAction = (payload: string): AnyAction => ({
  type: "notification/remove",
  payload,
});
