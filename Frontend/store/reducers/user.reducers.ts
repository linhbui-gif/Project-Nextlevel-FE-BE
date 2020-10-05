import { AnyAction } from "redux";
import { HYDRATE } from "next-redux-wrapper";
import { TUser, TUserValidation } from "../../types";

export interface UserState {
  user?: TUser;
  loading: boolean;
  validation?: TUserValidation;
  token: string;
}

const initState: UserState = {
  user: undefined,
  loading: false,
  validation: undefined,
  token: null,
};

const reducer = (
  state: UserState = initState,
  action: AnyAction
): UserState => {
  switch (action.type) {
    case HYDRATE:
      return { ...state, ...action.payload.users };
    case "user/signup":
    case "user/login":
    case "user/forgot":
    case "user/reset":
      return { ...state, loading: true };
    case "user/loader":
      return { ...state, loading: action.payload };
    case "user/validation":
      return { ...state, validation: action.payload };
    case "user/received":
      return { ...state, user: action.payload, loading: false };
    case "user/token":
      return { ...state, token: action.payload, loading: false };
    case "user/logout":
      return { ...state, token: null, user: null };
    default:
      return state;
  }
};
export default reducer;
