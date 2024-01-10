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

type ImagesResponse = {
  data: {
    attributes: {
      HomepageImages: {
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

const Home = ({ images }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const divRef = useRef<HTMLDivElement | null>(null);

  // const { mousePosition, elementRect } = trackMousePosition(divRef);

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
              images.data.attributes.HomepageImages.data.length > 1
                ? "animate-pulseBrightness"
                : ""
            }`}
            style={{
              height: "calc(100vh - 70px)",
              backgroundImage: `url(${getStrapiMedia({
                data: {
                  attributes:
                    images.data.attributes.HomepageImages.data[0].attributes,
                },
              })})`,
            }}
          />
          {images.data.attributes.HomepageImages.data.length > 1 && (
            <div
              className="absolute w-full h-full y-16 x-16 bg-cover opacity-50 animate-pulseBrightnessAntiPhase"
              style={{
                height: "calc(100vh - 70px)",
                transform: "rotate(180deg)",
                transformOrigin: "center",
                backgroundImage: `url(${getStrapiMedia({
                  data: {
                    attributes:
                      images.data.attributes.HomepageImages.data[1].attributes,
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
  images: ImagesResponse;
}> = async () => {
  // Run API calls in parallel
  const [imageRes] = await Promise.all([
    fetchAPI("/homepage-image", { populate: "*" }),
  ]);

  return {
    props: {
      images: imageRes,
    },
    revalidate: 1,
  };
};

export default Home;
