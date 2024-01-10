import type { GetStaticProps, InferGetStaticPropsType } from "next";
import Head from "next/head";
import { Header } from "../components/Header";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Footer } from "../components/Footer";
import { fetchAPI } from "../lib/api";
import { getStrapiMedia } from "../lib/media";
import { StrapiImage } from "../types";
import { useRef } from "react";
import { useTrackMousePosition } from "../hooks/usetrackMousePosition";
import { useWindowSize } from "../hooks/useWindowSize";

type DesktopImagesResponse = {
  data: {
    attributes: {
      HomepageImages: {
        data: StrapiImage[];
      };
    };
  };
};

type MobileImagesResponse = {
  data: {
    attributes: {
      HomepageImagesMobile: {
        data: StrapiImage[];
      };
    };
  };
};

type ContentResponse = {
  data: {
    attributes: {
      markup: string;
    };
  };
};

const Home = ({
  desktopImages: desktopImages,
  mobileImages: mobileImages,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const divRef = useRef<HTMLDivElement | null>(null);

  const { isMobile } = useWindowSize();

  console.log(isMobile);

  return (
    <div>
      <Head>
        <meta name="description" content="Bubble People" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="relative">
        <Header />
        <div className="mt-[94px] md:mt-[70px]  w-full relative overflow-hidden">
          <div
            className={`absolute w-full h-full y-16 x-16 bg-cover opacity-50 ${
              (isMobile
                ? mobileImages.data.attributes.HomepageImagesMobile.data.length
                : desktopImages.data.attributes.HomepageImages.data.length) > 1
                ? "animate-pulseBrightness"
                : ""
            }`}
            style={{
              height: "calc(100vh - 70px)",
              backgroundImage: `url(${getStrapiMedia({
                data: {
                  attributes: (isMobile
                    ? mobileImages.data.attributes.HomepageImagesMobile
                    : desktopImages.data.attributes.HomepageImages
                  ).data[0].attributes,
                },
              })})`,
            }}
          />
          {(isMobile
            ? mobileImages.data.attributes.HomepageImagesMobile
            : desktopImages.data.attributes.HomepageImages
          ).data.length > 1 && (
            <div
              className="absolute w-full h-full y-16 x-16 bg-cover opacity-50 animate-pulseBrightnessAntiPhase"
              style={{
                height: "calc(100vh - 70px)",
                transform: "rotate(180deg)",
                transformOrigin: "center",
                backgroundImage: `url(${getStrapiMedia({
                  data: {
                    attributes: (isMobile
                      ? mobileImages.data.attributes.HomepageImagesMobile
                      : desktopImages.data.attributes.HomepageImages
                    ).data[1].attributes,
                  },
                })})`,
                backgroundPosition: "center",
              }}
            />
          )}
          <div
            ref={divRef}
            className="flex justify-center bg-transparent"
            style={{
              height: "calc(100vh - 70px)",
            }}
          >
            <img
              src={"/logo.png"}
              className="object-contain p-8 md:p-32 pointer-none mix-blend-screen animate-spinMobile md:animate-spinDesktop"
            />
            <div className=""></div>
          </div>
          <Footer />
        </div>
      </main>
    </div>
  );
};

export const getStaticProps: GetStaticProps<{
  desktopImages: DesktopImagesResponse;
  mobileImages: MobileImagesResponse;
}> = async () => {
  // Run API calls in parallel
  const [desktopImageRes, mobileImageRes] = await Promise.all([
    fetchAPI("/homepage-image", { populate: "*" }),
    fetchAPI("/homepage-image-mobile", { populate: "*" }),
  ]);

  return {
    props: {
      desktopImages: desktopImageRes,
      mobileImages: mobileImageRes,
    },
    revalidate: 1,
  };
};

export default Home;
