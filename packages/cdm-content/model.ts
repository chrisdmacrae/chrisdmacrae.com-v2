export type BaseModel = {
  created: string | Date;
  updated: string | Date;
  createdBy: Author
}

export type Author = {
  firstName: string;
  lastName: string;
  bio: string;
  avatar?: string;
}