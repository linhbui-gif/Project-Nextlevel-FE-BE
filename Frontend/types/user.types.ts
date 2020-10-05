import { TBaseEntity } from ".";

export type TCreateUser = {
  id?: string;
  email: string;
  password?: string;
  firstName: string;
  lastName: string;
  cv?: string;
};
export type TUserRole = "admin" | "editor" | "member";

export type TUser = TBaseEntity &
  TCreateUser & {
    roles: TUserRole[];
  };

export type TUserValidation = string[];

export type TUserCredetials = {
  email: string;
  password: string;
};
export type TAuthToken = {
  // eslint-disable-next-line camelcase
  access_token: string;
};

export type TUserSummary = {
  firstName: string;
  lastName: string;
  updatedDate: Date;
};

export type TForgot = {
  email: string;
};

export type TReset = {
  password: string;
  code: string;
};
