export type BaseModel = {
  created: Date;
  updated: Date;
  createdBy: Author
}

export type Author = {
  firstName: string;
  lastName: string;
  bio: string;
  avatar?: string;
}