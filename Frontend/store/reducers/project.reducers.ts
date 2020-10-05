import { AnyAction } from "redux";
import { TProject, TProjectList } from "../../types";

export interface ProjectState {
  project: TProject;
  loading: boolean;
  projectList: TProjectList;
  listLoading: boolean;
}

export const initState = {
  project: undefined,
  loading: false,
  projectList: undefined,
  listLoading: false,
};

const reducer = (
  state: ProjectState = initState,
  action: AnyAction
): ProjectState => {
  switch (action.type) {
    case "projects/loader":
      return { ...state, listLoading: action.payload };
    case "projects/list":
      return { ...state, listLoading: true };
    case "projects/received":
      return { ...state, projectList: action.payload, listLoading: false };

    case "project/loader":
      return { ...state, loading: action.payload };

    case "project/new":
      return { ...state, loading: true };

    case "project/id":
      return { ...state, project: undefined, loading: true };

    case "project/edit":
      return { ...state, loading: true };

    case "project/delete":
      return { ...state, loading: true };

    case "project/received":
      return { ...state, project: action.payload, loading: false };

    default:
      return state;
  }
};
export default reducer;
