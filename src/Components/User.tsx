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
        <img src="https://picsum.photos/1000/500" alt="Cover" className="" />{" "}
        <div className="absolute bottom-0 right-0 flex gap-1 p-2 bg-[#ffffff] rounded-md">
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
        <div className="absolute">
          <img
            src="https://picsum.photos/100"
            alt="User"
            className="rounded-full "
          />
        </div>
      </div>
    </div>
  );
}

export default User;
