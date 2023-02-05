interface VideoData {
  id: string;
  title: string;
  description: string;
  url: string;
  uploader: {
    displayName: string | null;
    photoURL: string | null;
    id: string;
  };
  likes: string[];
  dislikes: string[];
  comments: object[];
  views: string[];
  date: string;
}
export default VideoData;
