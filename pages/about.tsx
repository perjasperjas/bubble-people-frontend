import type { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import Head from "next/head";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination, A11y, Autoplay } from "swiper";

import Image from "next/image";
import Home from ".";
import { Header } from "../components/Header";
import { fetchAPI } from "../lib/api";
import { StrapiImage } from "../types";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Footer } from "../components/Footer";

type AboutPageContent = {
  data: {
    attributes: {
      images: { data: StrapiImage[] };
      text1: string;
      text2: string;
      bio: string;
    };
  };
};

SwiperCore.use([Pagination, Autoplay]);

const About = ({ content }: InferGetStaticPropsType<typeof getStaticProps>) => {
  console.log(content);
  return (
    <div>
      <main className="about-page">
        <Header />
        <div
          className="w-screen bg-bg-blue mt-[94px] md:mt-[70px]  relative"
          style={{ minHeight: "calc(100vh - 70px)" }}
        >
          <div className="md:absolute w-full h-full flex flex-col items-center md:pt-16 z-0">
            <div className="w-full lg:w-[800px] h-[500px]">
              <Swiper
                // install Swiper modules
                modules={[Pagination, A11y]}
                spaceBetween={0}
                slidesPerView={1}
                pagination={{ clickable: true }}
                scrollbar={{ draggable: true }}
                className="h-full w-full"
                direction="horizontal"
                autoplay={{ delay: 5000 }}
              >
                {content.data.attributes.images.data.map((image, index) => (
                  <SwiperSlide className="">
                    <Image
                      src={image.attributes.url}
                      layout="fill"
                      objectFit="cover"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <div className="mt-8 px-8 w-full lg:w-[800px]">
              <p>
                {content.data.attributes.bio.split("\n").map((text) => (
                  <p className="text-button text-[18px]">{text}</p>
                ))}
              </p>
            </div>
          </div>
          <div className="w-full flex z-10 p-16 pointer-events-none mix-blend-difference saturate-200">
            <div className="relative w-full h-full flex flex-col md:flex-row justify-between pointer-events-none">
              <div className="w-full h-full text-white text-[24px] w-full md:w-[45%]">
                {content.data.attributes.text1.split("\n").map((text) => (
                  <p className="text-main-glow">{text}</p>
                ))}
              </div>
              <div className="w-full h-full text-white text-[24px] w-full md:w-[45%] md:pt-32 text-right">
                {content.data.attributes.text2.split("\n").map((text) => (
                  <p className="text-main-glow">{text}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </main>
    </div>
  );
};

export const getStaticProps: GetStaticProps<{
  content: AboutPageContent;
}> = async () => {
  // Run API calls in parallel
  const [aboutRes] = await Promise.all([
    fetchAPI("/about-page", { populate: "*" }),
  ]);

  return {
    props: {
      content: aboutRes,
    },
    revalidate: 1,
  };
};

export default About;
