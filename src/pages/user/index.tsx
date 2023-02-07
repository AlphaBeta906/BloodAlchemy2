import Layout from "@/layouts/Layout";
import UsersPage from "@/containers/Users";

export default function Elements() {
	return (
		<Layout title="Elements" devtools={true}>
			<UsersPage />
		</Layout>
	);
}