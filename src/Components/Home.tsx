import React from "react";
import { Link } from "react-router-dom";

const videosList = [
  {
    id: 1,
    title: "React - The Complete Guide (incl Hooks, React Router, Redux)",
    channel: "youtube",
    image: "https://img.youtube.com/vi/QH2-TGUlwu4/hqdefault.jpg",
    views: "1,001,023",
    likes: "1,001,023",
    duration: "34:23",
    video: "https://www.youtube.com/embed/QH2-TGUlwu4",
  },
  {
    id: 2,
    title: "React - The Complete Guide (incl Hooks, React Router, Redux)",
    channel: "youtube",
    image: "https://img.youtube.com/vi/QH2-TGUlwu4/hqdefault.jpg",
    views: "1,001,023",
    likes: "1,001,023",
    duration: "34:23",
    video: "https://www.youtube.com/embed/QH2-TGUlwu4",
  },
  {
    id: 3,
    title: "React - The Complete Guide (incl Hooks, React Router, Redux)",
    channel: "youtube",
    image: "https://img.youtube.com/vi/QH2-TGUlwu4/hqdefault.jpg",
    views: "1,001,023",
    likes: "1,001,023",
    duration: "34:23",
    video: "https://www.youtube.com/embed/QH2-TGUlwu4",
  },
  {
    id: 4,
    title: "React - The Complete Guide (incl Hooks, React Router, Redux)",
    channel: "youtube",
    image: "https://img.youtube.com/vi/QH2-TGUlwu4/hqdefault.jpg",
    views: "1,001,023",
    likes: "1,001,023",
    duration: "34:23",
    video: "https://www.youtube.com/embed/QH2-TGUlwu4",
  },
  {
    id: 5,
    title: "React - The Complete Guide (incl Hooks, React Router, Redux)",
    channel: "youtube",
    image: "https://img.youtube.com/vi/QH2-TGUlwu4/hqdefault.jpg",
    views: "1,001,023",
    likes: "1,001,023",
    duration: "34:23",
    video: "https://www.youtube.com/embed/QH2-TGUlwu4",
  },
  {
    id: 6,
    title: "React - The Complete Guide (incl Hooks, React Router, Redux)",
    channel: "youtube",
    image: "https://img.youtube.com/vi/QH2-TGUlwu4/hqdefault.jpg",
    views: "1,001,023",
    likes: "1,001,023",
    duration: "34:23",
    video: "https://www.youtube.com/embed/QH2-TGUlwu4",
  },
  {
    id: 7,
    title: "React - The Complete Guide (incl Hooks, React Router, Redux)",
    channel: "youtube",
    image: "https://img.youtube.com/vi/QH2-TGUlwu4/hqdefault.jpg",
    views: "1,001,023",
    likes: "1,001,023",
    duration: "34:23",
    video: "https://www.youtube.com/embed/QH2-TGUlwu4",
  },
];

function Home(): JSX.Element {
  return (
    <div>
      <div className="flex flex-wrap overflow-y-scroll">
        {videosList.map(video => (
          <div className="w-1/4 p-2" key={video.id}>
            <Link to={`/video/${video.id}`}>
              <div className="p-4 bg-gray-800 rounded-lg shadow-lg">
                <img src={video.image} alt={video.title} className="w-full" />
                <div className="p-4">
                  <h3 className="mb-2 text-xl font-bold">{video.title}</h3>
                  <p className="text-sm text-gray-400">{video.channel}</p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
