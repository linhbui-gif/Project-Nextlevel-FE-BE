import { AnyAction } from "redux";
import {
  TUser,
  TUserValidation,
  TUserCredetials,
  TCreateUser,
  TForgot,
  TReset,
} from "../../types";

export const requestLoginAction = (payload: TUserCredetials): AnyAction => ({
  type: "user/login",
  payload,
});
export const restoreLoginAction = (payload: string): AnyAction => ({
  type: "user/restore",
  payload,
});
export const requestLogoutAction = (): AnyAction => ({
  type: "user/logout",
});
export const receivedUserValidationAction = (
  payload: TUserValidation
): AnyAction => ({
  type: "user/validation",
  payload,
});
export const requestSignUpAction = (payload: TCreateUser): AnyAction => ({
  type: "user/signup",
  payload,
});
export const receivedUserAction = (payload: TUser): AnyAction => ({
  type: "user/received",
  payload,
});
export const receivedTokenAction = (payload: string): AnyAction => ({
  type: "user/token",
  payload,
});
export const setUserLoader = (payload: boolean): AnyAction => ({
  type: "user/loader",
  payload,
});

export const requestForgotAction = (payload: TForgot): AnyAction => ({
  type: "user/forgot",
  payload,
});

export const requestResetAction = (payload: TReset): AnyAction => ({
  type: "user/reset",
  payload,
});
