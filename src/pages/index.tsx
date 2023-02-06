import ErrorMessage from "@/components/ErrorMessage";
import Layout from "@/layouts/Layout";

export default function Home() {
	return (
		<Layout title="Home">
			<ErrorMessage code="501">
				Sadly this page is not yet finished, please wait for Alpha to work on it.
			</ErrorMessage>
		</Layout>
	);
}
