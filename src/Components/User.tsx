import React from "react";
import {
  FaDiscord,
  FaFacebook,
  FaGlobe,
  FaInstagram,
  FaReddit,
  FaTiktok,
  FaTwitch,
  FaTwitter,
} from "react-icons/fa";

const socials = [
  {
    icon: "facebook",
    url: "https://www.facebook.com/",
  },
  {
    icon: "twitter",
    url: "https://www.twitter.com/",
  },
  {
    icon: "instagram",
    url: "https://www.instagram.com/",
  },
  {
    icon: "twitch",
    url: "https://www.twitch.tv/",
  },
  {
    icon: "website",
    url: "https://www.example.com/",
  },
  {
    icon: "reddit",
    url: "https://www.reddit.com/",
  },
  {
    icon: "tiktok",
    url: "https://www.tiktok.com/",
  },
  {
    icon: "discord",
    url: "https://www.discord.com/",
  },
];

function User(): JSX.Element {
  return (
    <div className="w-full">
      <div className="relative">
        <img
          src="https://picsum.photos/2000/500"
          alt="Cover"
          className="m-auto"
        />{" "}
        <div className="absolute bottom-0 right-0 flex gap-1 p-2 bg-[#ffffffbb] rounded-md h-1/3 w-1/2 overflow-hidden max-w-[175px] max-h-[40px] items-center justify-center">
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
        </div>
        <div className="absolute -translate-x-1/2 left-1/2 top-full">
          <img
            src="https://picsum.photos/500"
            alt="User"
            className="rounded-full w-20 sm-w-[9em] ring ring-[#ffffff8c]"
          />
        </div>
      </div>
    </div>
  );
}

export default User;
