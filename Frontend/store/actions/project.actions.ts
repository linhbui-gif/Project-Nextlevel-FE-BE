import { AnyAction } from "redux";
import {
  TCreateProject,
  TEditProject,
  TProject,
  TProjectList,
} from "../../types";

export const requestProjectListAction = (): AnyAction => {
  return {
    type: "projects/list",
  };
};
export const receivedProjectListAction = (payload: TProjectList): AnyAction => {
  return {
    type: "projects/received",
    payload,
  };
};

export const requestCreateProjectAction = (
  payload: TCreateProject
): AnyAction => ({
  type: "project/new",
  payload,
});

export const requestEditProjectAction = (payload: TEditProject): AnyAction => ({
  type: "project/edit",
  payload,
});

export const requestProjectAction = (
  payload: string | string[]
): AnyAction => ({
  type: "project/id",
  payload,
});

export const receivedProjectAction = (payload: TProject): AnyAction => ({
  type: "project/received",
  payload,
});

export const requestDeleteProjectAction = (payload: string): AnyAction => ({
  type: "project/delete",
  payload,
});

export const setProjectLoader = (payload: boolean): AnyAction => ({
  type: "project/loader",
  payload,
});

export const setProjectListLoader = (payload: boolean): AnyAction => ({
  type: "projects/loader",
  payload,
});
