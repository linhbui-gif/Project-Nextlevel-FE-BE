import axios, { AxiosResponse } from "axios";
import { TCreateProject, TEditProject, TProject } from "../types";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// eslint-disable-next-line import/prefer-default-export
export const createProject = (
  project: TCreateProject
): Promise<AxiosResponse<TProject>> =>
  axios.post(`${BASE_URL}/project`, project);
export const requestProject = (id: string): Promise<AxiosResponse<TProject>> =>
  axios.get(`${BASE_URL}/project/${id}`);
export const editProject = (
  project: TEditProject
): Promise<AxiosResponse<TProject>> =>
  axios.put(`${BASE_URL}/project/${project.id}`, project);
export const deleteProject = (id: string): Promise<AxiosResponse<TProject>> =>
  axios.delete(`${BASE_URL}/project/${id}`);
export const requestProjectList = (): Promise<AxiosResponse<TProject>> =>
  axios.get(`${BASE_URL}/project`);
