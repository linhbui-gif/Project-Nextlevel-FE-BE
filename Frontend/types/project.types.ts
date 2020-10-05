import { TBaseEntity } from ".";

export type TCreateProject = {
  name: string;
  description: string;
};

export type TEditProject = {
  id: string;
  name: string;
  description: string;
};

export type TProject = TCreateProject &
  TBaseEntity & {
    id: string;
  };

export type TProjectList = TProject[];
