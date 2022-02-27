import React from "react";
// import {
//   FaDiscord,
//   FaFacebook,
//   FaGlobe,
//   FaInstagram,
//   FaReddit,
//   FaTiktok,
//   FaTwitch,
//   FaTwitter,
// } from "react-icons/fa";
import { Link } from "react-router-dom";
import turnNumerIntoWords from "../Utils/turnNumbersIntoWords";

// const socials = [
//   {
//     icon: "facebook",
//     url: "https://www.facebook.com/",
//   },
//   {
//     icon: "twitter",
//     url: "https://www.twitter.com/",
//   },
//   {
//     icon: "instagram",
//     url: "https://www.instagram.com/",
//   },
//   {
//     icon: "twitch",
//     url: "https://www.twitch.tv/",
//   },
//   {
//     icon: "website",
//     url: "https://www.example.com/",
//   },
//   {
//     icon: "reddit",
//     url: "https://www.reddit.com/",
//   },
//   {
//     icon: "tiktok",
//     url: "https://www.tiktok.com/",
//   },
//   {
//     icon: "discord",
//     url: "https://www.discord.com/",
//   },
// ];

const videos = [
  {
    id: 1,
    title: "React - The Complete Guide (incl Hooks, React Router, Redux)",
    image: "https://img.youtube.com/vi/QH2-TGUlwu4/hqdefault.jpg",
  },
  {
    id: 2,
    title: "React - The Complete Guide (incl Hooks, React Router, Redux)",
    image: "https://img.youtube.com/vi/QH2-TGUlwu4/hqdefault.jpg",
  },
  {
    id: 3,
    title: "React - The Complete Guide (incl Hooks, React Router, Redux)",
    image: "https://img.youtube.com/vi/QH2-TGUlwu4/hqdefault.jpg",
  },
  {
    id: 4,
    title: "React - The Complete Guide (incl Hooks, React Router, Redux)",
    image: "https://img.youtube.com/vi/QH2-TGUlwu4/hqdefault.jpg",
  },
  {
    id: 5,
    title: "React - The Complete Guide (incl Hooks, React Router, Redux)",
    image: "https://img.youtube.com/vi/QH2-TGUlwu4/hqdefault.jpg",
  },
  {
    id: 6,
    title: "React - The Complete Guide (incl Hooks, React Router, Redux)",
    image: "https://img.youtube.com/vi/QH2-TGUlwu4/hqdefault.jpg",
  },
  {
    id: 7,
    title: "React - The Complete Guide (incl Hooks, React Router, Redux)",
    image: "https://img.youtube.com/vi/QH2-TGUlwu4/hqdefault.jpg",
  },
];

function User(): JSX.Element {
  return (
    <div className="w-full py-10">
      <div className="relative">
        {/* <img
          src="https://picsum.photos/2000/500"
          alt="Cover"
          className="m-auto"
        />{" "} */}
        {/* <div className="absolute top-0 right-0 flex gap-1 p-2 bg-[#ffffffbb] rounded-md h-1/3 w-1/2 overflow-hidden max-w-[175px] max-h-[40px] items-center justify-center">
          {socials.map(social => (
            <a
              href={social.url}
              className="hover:scale-105"
              target={social.icon === "website" ? "_blank" : ""}
              rel="noreferrer"
            >
              <i className="">
                {social.icon === "facebook" && (
                  <FaFacebook className=" text-[#1778F2] " />
                )}
                {social.icon === "twitter" && (
                  <FaTwitter className=" text-[#55ACEE]" />
                )}
                {social.icon === "instagram" && (
                  <FaInstagram className=" text-[#DD2A7B]" />
                )}
                {social.icon === "twitch" && (
                  <FaTwitch className=" text-[#6441A4]" />
                )}
                {social.icon === "reddit" && (
                  <FaReddit className=" text-[#FF4500]" />
                )}
                {social.icon === "website" && (
                  <FaGlobe className=" text-[black]" />
                )}
                {social.icon === "tiktok" && (
                  <FaTiktok className=" text-[#69C9D0]" />
                )}
                {social.icon === "discord" && (
                  <FaDiscord className=" text-[#738ADB]" />
                )}
              </i>
            </a>
          ))}
        </div> */}
        <div className="flex flex-col items-center justify-start w-full ">
          <img
            src="https://picsum.photos/500"
            alt="User"
            className="rounded-full w-20 sm-w-[9em] ring ring-[#ffffff8c]"
          />
          <h1 className="pt-4 text-xl font-semibold text-gray-200">User</h1>
          <p className="text-xs text-gray-400">
            {" "}
            {
              // TODO: get number of subs from backend
              turnNumerIntoWords(123456789)
            }{" "}
            subscribers
          </p>
          <p className="px-4 py-2 text-center text-gray-200">I Make Videos!</p>
          <button
            type="button"
            className="border-[#cf2d2b] border-2 py-2 px-4 m-2 rounded-lg hover:bg-[#cf2d2b] active:scale-[.98] transition-all hover:text-white text-sm font-medium"
          >
            Subscribe
          </button>
        </div>
      </div>{" "}
      <div className="flex flex-wrap items-center justify-start gap-2 p-10 overflow-x-hidden overflow-y-scroll">
        {videos.map(video => (
          <div
            className=" sm:w-[23em] hover:scale-[1.02] active:scale-[.995] transition-all"
            key={video.id}
          >
            <Link to={`/video/${video.id}`}>
              <div className="overflow-hidden  bg-[#000000aa] rounded-lg shadow-lg">
                <img src={video.image} alt={video.title} className="w-full" />
                <div className="p-4">
                  <h3 className="mb-2 font-semibold md:text-xl">
                    {video.title}
                  </h3>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default User;
