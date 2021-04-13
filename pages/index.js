import { Card, Typography } from "@material-ui/core";
import Head from "next/head";
import Link from "next/link";
import Layout from "../components/Layout";

export default function Home() {
  return (
    <Layout titleAddition='Bite-sized film reviews'>
      <Typography variant='h5'>Film Reviews</Typography>
    </Layout>
  );
}
