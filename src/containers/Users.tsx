import type { user } from "@prisma/client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

import Avatar from "@/components/Avatar";
import Loader from "@/components/Loader";
import Roles from "@/components/Roles";

export default function UsersPage() {
	const { isLoading, error, data } = useQuery({
		queryKey: ["element"],
		queryFn: async () => {
			const result = await fetch("/api/user");

			const rjson = result.json();

			return rjson;
		}
	});

	if (isLoading) return <Loader />;

	if (error instanceof Error) return (
		<>
			An error has occurred: {error.message}
		</>
	);

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