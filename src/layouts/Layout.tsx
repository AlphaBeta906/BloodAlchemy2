import type { ReactNode } from "react";

import Head from "next/head";

import QueryWrapper from "@/components/QueryWrapper";
import Navbox from "@/containers/Navbox";

/**
 * `Props` is an object with optional properties `title`, `devtools`, and `children`.
 * @property {string} title - The title of the page.
 * @property {boolean} devtools - boolean - If true, the Redux DevTools will be shown.
 * @property {ReactNode} children - The children of the component.
 */
type Props = {
	title?: string;
	devtools?: boolean;
	children?: ReactNode;
}

/**
 * It renders a page with a navbar and a query wrapper
 * @param {Props} props - The props that are passed to the component.
 * @returns A React component.
 */
export default function Layout({ title = "Page", devtools = false, children }: Props) {
	return (
		<>
			<Head>
				<meta charSet="UTF-8" />
				<meta name="viewport" content="width=device-width" />
				<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
				<title>{title}</title>
			</Head>
			<Navbox />
			<QueryWrapper devtools={devtools}>
				{children}
			</QueryWrapper>
		</>
	);
}