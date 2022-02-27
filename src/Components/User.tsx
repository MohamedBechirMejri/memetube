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
    icon: "reddit",
    url: "https://www.discord.com/",
  },
];

function User(): JSX.Element {
  return (
    <div className="w-full">
      <div className="relative">
        <img src="https://picsum.photos/1000/500" alt="Cover" className="" />{" "}
        <div className="absolute bottom-0 right-0 flex gap-1 p-2 bg-[#ffffff2f] rounded-md">
          {socials.map(social => (
            <a href={social.url} className="">
              <i className="">
                {social.icon === "facebook" && <FaFacebook />}
                {social.icon === "twitter" && <FaTwitter />}
                {social.icon === "instagram" && <FaInstagram />}
                {social.icon === "twitch" && <FaTwitch />}
                {social.icon === "reddit" && <FaReddit />}
                {social.icon === "website" && <FaGlobe />}
                {social.icon === "tiktok" && <FaTiktok />}
                {social.icon === "discord" && <FaDiscord />}
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
