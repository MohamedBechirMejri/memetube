import { ClientUploadedFileData } from "uploadthing/types";

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
  nsfw: boolean;
  serverData: ClientUploadedFileData<{
    uploadedBy: string;
  }>;
};

export type Comment = {
  id: string;
  author: {
    id: string;
    name: string;
    image: string;
  };
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

export type TComment = Comment