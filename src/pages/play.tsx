import Layout from "@/layouts/Layout";
import PlayPage from "@/containers/Play";

export default function SignIn() {
	return (
		<Layout title="Play" devtools={true}>
			<PlayPage />
		</Layout>
	);
}