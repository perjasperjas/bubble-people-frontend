import type { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import Head from "next/head";
import { Header } from "../components/Header";
import { fetchAPI } from "../lib/api";
import { StrapiImage } from "../types";
import Image from "next/image";
import { getStrapiMedia } from "../lib/media";
import { imageConfigDefault } from "next/dist/shared/lib/image-config";
import { Button } from "../components/Button";
import { utimesSync } from "fs";
import { ShopCard } from "../components/ShopCard";
import { GLSLCanvas } from "../components/GLSLCanvas";
import { Footer } from "../components/Footer";

export type ShopItem = {
  attributes: {
    createdAt: string;
    description: string;
    images: { data: StrapiImage[] };
    price: number;
    publishedAt: string;
    title: string;
    updatedAt: string;
    link: string;
  };
};

const Shop = ({
  shopItems,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <div>
      <main className="relative">
        <Header />
        <div
          className="w-screen bg-bg-blue flex flex-col mt-[94px] md:mt-[70px]  p-8 absolute pb-16 md:pb-0"
          style={{ minHeight: "calc(100vh - 70px)" }}
        >
          {shopItems.map((item, index) => (
            <div className="flex">
              <div className="mb-4 md:h-64 w-full">
                <ShopCard
                  item={item}
                  direction={index % 2 === 0 ? "left" : "left"}
                />
              </div>
            </div>
          ))}
        </div>
        <Footer />
      </main>
    </div>
  );
};

export const getStaticProps: GetStaticProps<{
  shopItems: ShopItem[];
}> = async () => {
  // Run API calls in parallel
  const [shopItemRes] = await Promise.all([
    fetchAPI("/shop-items", { populate: "*" }),
  ]);

  return {
    props: {
      shopItems: shopItemRes.data as ShopItem[],
    },
    revalidate: 1,
  };
};

export default Shop;
