import { Typography } from "@material-ui/core";
import Head from "next/head";
import Link from "next/link";
import React from "react";
import Header from "./Header";

export default function Layout({ titleAddition, children }) {
  return (
    <>
      <Head>
        <title>
          {`Watch First Think Later${
            titleAddition ? " - " + titleAddition : ""
          }`}
        </title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Header className='layoutHeader' />

      <main
        style={{ padding: 20, backgroundColor: "#4F5D75" }}
        className='layoutMain'
      >
        {children}
      </main>

      <footer
        style={{
          padding: 20,
          backgroundColor: "#2D3142",
          color: "white",
        }}
        className='layoutFooter'
      >
        <Typography variant='caption'>
          Words and Website by{" "}
          <Link href='https://lucask95.github.io/'>
            <a style={{ color: "lightgray" }}>Lucas Keller</a>
          </Link>
        </Typography>
      </footer>
    </>
  );
}
