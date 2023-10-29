export type PostType = {
  id: number;
  uid: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt?: Date;
  _doc?: any;
};
