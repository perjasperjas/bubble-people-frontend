import type { NextPage } from "next";
import Head from "next/head";
import { Header } from "../components/Header";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <meta name="description" content="Bubble People" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="h-screen relative">
        <Header />
        <div className="h-full p-8 flex flex-col bg-background absolute"></div>
      </main>
    </div>
  );
};

export default Home;