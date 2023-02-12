import Layout from "@/layouts/Layout";
import SigninPage from "@/containers/SignIn";

export default function SignIn() {
	return (
		<Layout title="Signin" devtools={true}>
			<SigninPage />
		</Layout>
	);
}