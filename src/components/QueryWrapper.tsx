import type { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import PropTypes from "prop-types";

type Props = {
	children?: ReactNode;
}

/**
 * It creates a new QueryClient and then wraps the children in a QueryClientProvider
 * @returns A QueryClientProvider component that wraps the children prop.
 */
export default function QueryWrapper({ children }: Props) {
	const queryClient = new QueryClient();

	return (
		<QueryClientProvider client={queryClient}>
			{children}
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	);
}

QueryWrapper.propTypes = {
	children: PropTypes.node.isRequired
};