import "../styles/globals.css";

import React, { useEffect } from "react";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Head from "next/head";

import { cookieToInitialState } from "wagmi";
import { config } from '@/app/blockchain/config/Web3Config'
import { headers } from 'next/headers'
import Web3ModalProvider from "@/app/blockchain/context/Web3Provider";
import { AudioManagerProvider } from "@/app/hooks/useAudioManager";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/vue";
import { Files } from "@/app/vars/Files";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "$KimboUp",
	description: "",
	icons: {
		icon: Files.IMAGES.FAVICON
	}
};

export default function RootLayout({ children, }: Readonly<{
	children: React.ReactNode;
}>) {

	const initialState = cookieToInitialState(config, headers().get("cookie"))

	return (
		<html lang="en">
		<Head>
			<link rel="preconnect" href="https://fonts.googleapis.com"/>
			<link rel="preconnect" href="https://fonts.gstatic.com"/>
			<link href="https://fonts.googleapis.com/css2?family=Pixelify+Sans:wght@400..700&display=swap"
				  rel="stylesheet"/>
		</Head>
		<body >
		<main className="main">
			<AudioManagerProvider>
				<Web3ModalProvider initialState={ initialState }>
					{ children }
				</Web3ModalProvider>
			</AudioManagerProvider>

			{/*
			<Analytics />
			<SpeedInsights />
			*/}
		</main>
		</body>
		</html>
	);

}