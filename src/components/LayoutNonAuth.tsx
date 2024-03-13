// src/app/components/LayoutNonAuth.tsx
import React from "react";
import Head from "next/head";
import { Inter } from "next/font/google";
import "../styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Head>
        <title>Flash Card App</title>
        <meta name="description" content="To help with test prep." />
        <meta name="keywords" content="flashcards, quizzes, study" />
        <meta name="author" content="Steven Hagene" />
      </Head>
      <div className={inter.className}>{children}</div>
    </>
  );
}
