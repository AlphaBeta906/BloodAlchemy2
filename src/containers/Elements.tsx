import type { element } from "@prisma/client";

import { useState } from "react";
import Link from "next/link";

import ElemBox from "@/components/ElemBox";
import Loader from "@/components/Loader";
import { trpc } from "@/lib/trpc";

/**
 * `ElementsPage` is a React component that fetches a list of elements from the server and displays
 * them
 * @returns A list of elements.
 */
export default function ElementsPage() {
	const [page, setPage] = useState(0);

	const { data, error, status, fetchNextPage } = trpc.element.infiniteElements.useInfiniteQuery(
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

	const elemList = toShow?.map((element: element) => {
		return (
			<div className="font-mono px-2 py-1 flex items-center" key={element.id.toString()}>
				{`#${element.id}`}:&nbsp;<Link
					className="inline-block"
					href="/element/[name]"
					as={`/element/${element.name}`}
				>
					<ElemBox name={element.name} color={element.color} width={50} />
				</Link>
			</div>
		);
	});

	return (
		<div className="pt-2">
			{elemList}

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