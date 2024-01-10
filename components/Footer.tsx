import React from "react";
import { AiOutlineInstagram, AiOutlineMail } from "react-icons/ai";
import { FaBandcamp } from "react-icons/fa";
import { ImSoundcloud } from "react-icons/im";

export const Footer = () => {
  return (
    <footer className="fixed bottom-0 w-fit left-1/2 translate-x-[-50%] p-8 flex justify-center">
      <button className="w-8 h-8 mr-4 brightness-75 hover:brightness-100">
        <a href={"https://www.instagram.com/jasper_drifts/"} target="_blank">
          <AiOutlineInstagram color="white" className="w-full h-full" />
        </a>
      </button>
      <button className="w-8 h-8 mr-4 brightness-75 hover:brightness-100">
        <a href={"https://bubblepeople.bandcamp.com/music"} target="_blank">
          <FaBandcamp color="white" className="w-full h-full" />
        </a>
      </button>
      <button className="w-8 h-8 mr-4 brightness-75 hover:brightness-100">
        <a href="https://soundcloud.com/bubblepeopleofficial" target="_blank">
          <ImSoundcloud color="white" className="w-full h-full" />
        </a>
      </button>
      <button className="w-8 h-8 mr-4 brightness-75 hover:brightness-100">
        <a href="mailto:bubblepeopleofficial@hotmail.com" target="_blank">
          <AiOutlineMail color="white" className="w-full h-full" />
        </a>
      </button>
    </footer>
  );
};
