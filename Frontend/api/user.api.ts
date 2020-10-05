import axios, { AxiosResponse } from "axios";
import { TUser, TUploadedFile, TAuthToken, TForgot, TReset } from "../types";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
export const login = (user: TUser): Promise<AxiosResponse<TUser>> =>
  axios.post(`${BASE_URL}/user/login`, user);
export const signup = (user: TUser): Promise<AxiosResponse<TAuthToken>> =>
  axios.post(`${BASE_URL}/user`, user);

export const uploadCV = async (
  file: FormData
): Promise<AxiosResponse<TUploadedFile>> =>
  axios.post(`${BASE_URL}/user/upload/cv`, file, {
    headers: {
      Accept: "application/json",
      "Content-Type": "multipart/form-data",
    },
  });

export const uploadProfilePic = (
  file: FormData
): Promise<AxiosResponse<TUploadedFile>> =>
  axios.post(`${BASE_URL}/user/upload/profile`, file, {
    headers: {
      Accept: "application/json",
      "Content-Type": "multipart/form-data",
    },
  });

export const forgotPassword = (
  email: TForgot
): Promise<AxiosResponse<boolean>> =>
  axios.post(`${BASE_URL}/user/forgot-password`, email);

export const resetPassword = (reset: TReset): Promise<AxiosResponse<boolean>> =>
  axios.post(`${BASE_URL}/user/reset-password`, reset);
