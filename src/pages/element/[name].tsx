import { useRouter } from "next/router";

import Layout from "@/layouts/Layout";
import ElementPage from "@/containers/Element";

export default function Element() {
	const router = useRouter();
	const { name } = router.query;

	if (typeof name === "string") {
		return (
			<Layout title={`Element: ${name}`} devtools={true}>
				<ElementPage name={name} />
			</Layout>
		);
	}
}