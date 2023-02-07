import type { ReactNode } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

/**
 * Props is an object with an optional devtools property of type boolean and an optional children
 * property of type ReactNode.
 * @property {boolean} devtools - boolean - This is a boolean that determines whether or not the Redux
 * DevTools are enabled.
 * @property {ReactNode} children - This is the content that will be rendered inside the component.
 */
type Props = {
	devtools?: boolean
	children?: ReactNode;
}


/**
 * It creates a new QueryClient, wraps the children in a QueryClientProvider, and optionally adds a
 * ReactQueryDevtools component
 * @param {Props} props - React props
 * @returns A QueryClientProvider wrapper
 */
export default function QueryWrapper({ devtools, children }: Props) {
	const queryClient = new QueryClient();

	return (
		<QueryClientProvider client={queryClient}>
			{children}
			{devtools ? <ReactQueryDevtools initialIsOpen={false} /> : null }
		</QueryClientProvider>
	);
}