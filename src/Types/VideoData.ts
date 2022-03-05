interface VideoData {
  id: string;
  title: string;
  description: string;
  url: string;
  uploader: {
    displayName: string;
    photoURL: string;
    id: string;
  };
  likes: string[];
  dislikes: string[];
  comments: object[];
  views: number;
  date: string;
}
export default VideoData;
