import Layout from "@/layouts/Layout";
import ElementsPage from "@/containers/Elements";

export default function Elements() {
	return (
		<Layout title="Elements" devtools={true}>
			<ElementsPage />
		</Layout>
	);
}