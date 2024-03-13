import firebase from "firebase/compat/app";

export type Video = {
  id: string; 
  name: string;
  url: string;
  uploadedBy: string;
  categories: string[];
  views: string[];
  likes: string[];
  comments: Comment[];
  languages: string[];
  tags: Tag[];
  createdAt: number;
  updatedAt: number;
  serverData: any; // TODO: fix this
};

export type Comment = {
  author: string;
  body: string;
  likes: string[];
  replies: Comment[];
  createdAt: number;
  updatedAt: number;
};

export type Tag = {
  name: string;
  image?: string;
};
