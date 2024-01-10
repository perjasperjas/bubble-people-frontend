import Link from "next/link";
import React from "react";
import { Logo } from "./Logo";
import { useRouter } from "next/router";

export const Header = () => {
  const router = useRouter();

  return (
    <header className="fixed top-0 z-50 w-full font-title h-[94px] md:h-[70px] opacity-90">
      <div className="w-full h-full relative bg-gradient-to-b from-buttondark to-headergradientto">
        <div className="absolute w-full h-full noise-bg pointer-events-none" />
        <div className="w-full h-full py-4 px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="h-full w-[120px] mb-2 md:w-[180px] md:mb-0">
              <Link href="/">
                <Logo />
              </Link>
            </div>
            <div className="flex items-center text-lg">
              <Link href="/">
                <button
                  className={`mr-4 text-glow-button transition-all text-[20px] ${
                    router.asPath === "/" ? "!text-white" : ""
                  }`}
                >
                  home
                </button>
              </Link>
              <p className="mr-4 text-gray transition-all text-[16px]">||</p>
              <Link href="/media">
                <button
                  className={`mr-4 text-glow-button transition-all text-[20px] ${
                    router.asPath === "/media" ? "!text-white" : ""
                  }`}
                >
                  media
                </button>
              </Link>
              <p className="mr-4 text-gray transition-all text-[16px]">||</p>
              <Link href="/about">
                <button
                  className={`mr-4 text-glow-button transition-all text-[20px] ${
                    router.asPath === "/about" ? "!text-white" : ""
                  }`}
                >
                  about
                </button>
              </Link>
              <p className="mr-4 text-gray transition-all text-[16px]">||</p>
              <Link href="/store">
                <button
                  className={`mr-4 text-glow-button transition-all text-[20px] ${
                    router.asPath === "/store" ? "!text-white" : ""
                  }`}
                >
                  store
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
