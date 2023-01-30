import {
	QueryClient,
	QueryClientProvider,
} from "@tanstack/react-query";

import PropTypes from "prop-types";

export default function QueryWrapper({ children }) {
	const queryClient = new QueryClient();

	return (
		<QueryClientProvider client={queryClient}>
			{children}
		</QueryClientProvider>
	);
}

QueryWrapper.propTypes = {
	children: PropTypes.node.isRequired
};