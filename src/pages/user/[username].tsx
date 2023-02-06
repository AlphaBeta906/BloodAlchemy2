import { useRouter } from "next/router";

import Layout from "@/layouts/Layout";
import ProfilePage from "@/containers/Profile";

export default function Profile() {
	const router = useRouter();
	const { username } = router.query;

	if (typeof username === "string") {
		return (
			<Layout title={`Profile: ${username}`}>
				<ProfilePage username={username} />
			</Layout>
		);
	}
}