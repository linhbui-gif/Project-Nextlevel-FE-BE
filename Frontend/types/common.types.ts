export type TBaseEntity = {
  updatedDate: Date;
  createdDate: Date;
};

export type TUploadFile = {
  lastModified: number;
  lastModifiedDate: Date;
  name: string;
  path: string;
  size: number;
  type: string;
};
export type TUploadedFile = {
  url: string;
  size: number;
  mimetype: string;
};
