import type { GetStaticProps, InferGetStaticPropsType } from "next";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { ShopCard } from "../components/ShopCard";
import { fetchAPI } from "../lib/api";
import { StrapiImage } from "../types";

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
    Index: number;
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

  const sortedShopItems = (shopItemRes.data as ShopItem[]).sort(
    (a, b) => a.attributes.Index - b.attributes.Index
  );

  return {
    props: {
      shopItems: sortedShopItems,
    },
    revalidate: 1,
  };
};

export default Shop;
