import type { User } from "@prisma/client";

import { useState } from "react";
import Link from "next/link";

import { trpc } from "@/lib/trpc";
import Avatar from "@/components/Avatar";
import Loader from "@/components/Loader";
import Roles from "@/components/Roles";

/**
 * `UsersPage` is a function that returns a `div` element that contains a list of `div` elements that
 * contain a `Link` element that contains a `Avatar` element that contains a `Roles` element.
 * 
 * It uses the `useInfiniteQuery` hook to fetch the first page of users, and then uses the
 * `fetchNextPage` function to fetch the next page of users, and the `fetchPreviousPage` function
 * to fetch the previous page.
 * @returns A list of users.
 */
export default function UsersPage() {
	const [page, setPage] = useState(0);

	const { data, error, status, fetchNextPage } = trpc.user.infiniteUsers.useInfiniteQuery(
		{
			limit: 10, // will update when requests are open
		},
		{
			getNextPageParam: (lastPage) => lastPage.nextCursor,
		},
	);

	const handleFetchNextPage = () => {
		fetchNextPage();
		setPage((prev) => prev + 1);
	};

	const handleFetchPreviousPage = () => {
		setPage((prev) => prev - 1);
	};

	const toShow = data?.pages[page]?.items;

	if (error) {
		return (
			<>
				Returned error: {error?.data?.code}
			</>
		);
	}

	if (status !== "success") return <Loader />;

	const userList = toShow?.map((user: User) => {		
		return (
			<div className="font-mono px-2 py-1 flex items-center" key={user.id.toString()}>
				{`#${user.id}`}:&nbsp; 
				<Avatar username={user.username} width={35} />&nbsp;<Link href={`/user/${user.username}`} as={`/user/${user.username}`} className="text-blue-600 dark:text-blue-500">{user.username}</Link> <Roles username={user.username} />
			</div>
		);
	});

	return (
		<div className="pt-2">
			{userList}

			<center>
				<button 
					className="btn btn-secondary mx-3" 
					onClick={handleFetchPreviousPage}
					disabled={page === 0}
				>Back Page</button>
				<button 
					className="btn btn-secondary mx-3"
					onClick={handleFetchNextPage}
					disabled={data?.pages[page]?.nextCursor === undefined}
				>Next Page</button>
			</center>
		</div>
	);
}