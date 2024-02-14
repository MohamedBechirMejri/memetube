import firebase from "firebase/compat/app";

export type Video = {
  name: string;
  url: string;
  uploadedBy: string;
  categories: string[];
  views: string[];
  likes: string[];
  comments: Comment[];
  languages: string[];
  tags: Tag[];
  createdAt: firebase.firestore.Timestamp;
  updatedAt: firebase.firestore.Timestamp;
};

export type Comment = {
  author: string;
  body: string;
  likes: string[];
  replies: Comment[];
  createdAt: firebase.firestore.Timestamp;
  updatedAt: firebase.firestore.Timestamp;
};

export type Tag = {
  name: string;
  image?: string;
};
