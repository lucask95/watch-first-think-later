import Head from "next/head";
import React from "react";
import Header from "./Header";

export default function Layout({ titleAddition, children }) {
  return (
    <>
      <Head>
        <title>{`Watch First Think Later${
          titleAddition ? " - " + titleAddition : ""
        }`}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main style={{ padding: 20, backgroundColor: "#4F5D75" }}>
        {children}
      </main>
    </>
  );
}
