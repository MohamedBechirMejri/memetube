export type User = {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  image: string;
  name: string;
  favorites: string[];
  history: string[];
  likes: string[];
  uploads: string[];
  createdAt: number;
  updatedAt: number;
  preferences: Preferences;
};

export type Preferences = {
  language: "arabic" | "english" | "any";
  nsfw: boolean;
};
