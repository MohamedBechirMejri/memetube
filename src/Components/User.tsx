/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  query,
  collection,
  where,
  getDocs,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
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

function User(): JSX.Element {
  const [videos, setVideos] = useState([] as any[]);
  const [userData, setUserData] = useState(null as any);

  useEffect(() => {
    const db = getFirestore();
    const auth = getAuth();
    const user = auth.currentUser;
    if (user === null) {
      return;
    }
    const userRef = doc(db, `users`, user.uid);
    getDoc(userRef).then(usr => {
      setUserData(usr.data() as any);
    });
    const q = query(
      collection(db, "videos"),
      where("uploader.id", "==", userData.uid)
    );
    getDocs(q).then(videoos => {
      setVideos(videoos.docs.map(v => v.data()));
    });
  }, []);

  return !userData ? (
    <div>Loading...</div>
  ) : (
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
            src={userData.photoURL}
            alt="User"
            className="rounded-full w-20 sm-w-[9em] ring ring-[#ffffff8c]"
          />
          <h1 className="pt-4 text-xl font-semibold text-gray-200">
            {userData.displayName}
          </h1>
          <p className="text-xs text-gray-400">
            {" "}
            {turnNumerIntoWords(userData.subscribers.length)} subscribers
          </p>
          {/* <p className="px-4 py-2 text-center text-gray-200">I Make Videos!</p> */}
          {/* <button
            type="button"
            className="border-[#cf2d2b] border-2 py-2 px-4 m-2 rounded-lg hover:bg-[#cf2d2b] active:scale-[.98] transition-all hover:text-white text-sm font-medium"
          >
            Subscribe
          </button> */}
        </div>
      </div>{" "}
      <div className="flex flex-wrap items-center justify-start gap-2 p-10 overflow-x-hidden overflow-y-scroll">
        {videos.map((video, i) => (
          <div
            className={`" sm:w-[23em] hover:scale-[1.02] active:scale-[.995] transition-all animate-reveal opacity-0"`}
            key={video.id}
            style={{
              animationDelay: `${i * 0.05}s`,
            }}
          >
            <Link to={`/video/${video.id}`}>
              <div className="overflow-hidden bg-[#000000aa] rounded-lg shadow-lg">
                <ReactPlayer
                  url={video.url}
                  width="100%"
                  height="100%"
                  className="overflow-hidden shadow-lg rounded-xl max-h-52"
                />
                <div className="p-4">
                  <h3 className="mb-2 font-semibold md:text-xl">
                    {video.title}
                  </h3>
                  <p className="text-sm text-gray-400">
                    {video.uploader.displayName}
                  </p>
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
