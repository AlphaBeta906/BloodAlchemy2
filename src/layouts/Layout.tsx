import { ReactNode } from "react";
import Head from "next/head";
import QueryWrapper from "@/components/QueryWrapper";

import Navbox from "@/components/Navbox";

type Props = {
	title?: string;
	children?: ReactNode;
}

export default function Layout({ title = "Page", children }: Props) {
	return (
		<>
			<Head>
				<meta charSet="UTF-8" />
				<meta name="viewport" content="width=device-width" />
				<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
				<title>{title}</title>
			</Head>
			<Navbox />
			<QueryWrapper>
				{children}
			</QueryWrapper>
		</>
	);
}