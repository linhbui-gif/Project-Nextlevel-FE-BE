import { AxiosError } from "axios";

export type HandleErrorAction = { payload: AxiosError; type: "error/all" };
export type HandleServerErrorAction = {
  payload: AxiosError;
  type: "error/server";
};
export type HandleNetworkErrorAction = {
  payload: AxiosError;
  type: "error/network";
};
export type HandleOtherErrorAction = {
  payload: AxiosError;
  type: "error/other";
};

export const createHandleErrorAction = (
  error: AxiosError
): HandleErrorAction => ({
  payload: error,
  type: "error/all",
});

export const createHandleServerErrorAction = (
  error: AxiosError
): HandleServerErrorAction => ({
  payload: error,
  type: "error/server",
});

export const createHandleNetworkErrorAction = (
  error: AxiosError
): HandleNetworkErrorAction => ({
  payload: error,
  type: "error/network",
});

export const createHandleOtherErrorAction = (
  error: AxiosError
): HandleOtherErrorAction => ({
  payload: error,
  type: "error/other",
});
