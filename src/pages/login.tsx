import Layout from "@/layouts/Layout";
import LoginPage from "@/containers/Login";

export default function Login() {
	return (
		<Layout title="Login" devtools={true}>
			<LoginPage />
		</Layout>
	);
}