import type { user } from "@prisma/client";

import Link from "next/link";

import { trpc } from "@/lib/trpc";
import Avatar from "@/components/Avatar";
import Loader from "@/components/Loader";
import Roles from "@/components/Roles";

export default function UsersPage() {
	const { error, status, data } = trpc.user.user.useQuery();

	if (error) {
		return (
			<>
				Returned error: {error?.data?.code}
			</>
		);
	}

	if (status !== "success") return <Loader />;

	const elemList = data.map((user: user) => {		
		return (
			<div className="font-mono px-2 py-1 flex items-center" key={user.id.toString()}>
				{`#${user.id}`}:&nbsp; 
				<Avatar username={user.username} width={35} />&nbsp;<Link href={`/user/${user.username}`} as={`/user/${user.username}`} className="text-blue-600 dark:text-blue-500">{user.username}</Link> <Roles username={user.username} />
			</div>
		);
	});

	return (
		<div className="pt-2">
			{elemList}
		</div>
	);
}