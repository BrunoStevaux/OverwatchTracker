import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";

import SearchBar from "@/components/SearchBar";
import FilterButton from "@/components/FilterButton";
import FilterBar from "@/components/FilterBar";
import OWNavbar from "@/components/OWNavbar";
import PlayerGrid from "@/components/PlayerGrid";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {

function handleShowFilter() {
    console.log("Show Filter");
  }

  return (
    <>
      <Head>
        <title>OW2 Tracker</title>
        <meta
          name="description"
          content="Overwatch 2 Account Tracker Application"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main
        style={{
          backgroundImage:
            "url('https://images8.alphacoders.com/104/1049882.jpg')",
          backgroundSize: "cover",
          backgroundAttachment: "fixed",
        }}
      >
        <OWNavbar />

        <div style={{ display: "flex", justifyContent: "center" }}>
          <SearchBar />
        </div>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <FilterBar />
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
        >
          <PlayerGrid />
        </div>
      </main>
    </>
  );
}
