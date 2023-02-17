import { DateTime } from "luxon";
import { useState } from "react";

import Link from "next/link";

import { trpc } from "@/lib/trpc";
import ErrorMessage from "@/components/ErrorMessage";
import ElemBox from "@/components/ElemBox";
import Avatar from "@/components/Avatar";
import Loader from "@/components/Loader";

/**
 * `Props` is an object with a name property that is a string.
 * @property {string} name - The name of the component.
 */
type Props = {
	name: string;
}

/**
 * `ElementPage` is a component that fetches the element data from the server, 
 * and then displays it
 * @param {Props} props - The props that are passed to the component.
 * @returns The element page is being returned.
 */
export default function ElementPage({ name }: Props) {
	const [page, setPage] = useState(0);

	const { error, status, data: elemData } = trpc.element.byName.useQuery({
		name: name
	});

	const { data, fetchNextPage } = trpc.element.infiniteElements.useInfiniteQuery(
		{
			limit: 1, // will update when requests are open
		},
		{
			getNextPageParam: (lastPage) => lastPage.nextCursor,
			initialCursor: elemData?.id
		},
	);

	const handleFetchNextPage = () => {
		fetchNextPage();
		setPage((prev) => prev + 1);
	};

	const handleFetchPreviousPage = () => {
		setPage((prev) => prev - 1);
	};

	const toShow = data?.pages[page]?.items[0];

	if (error) {
		if (error.data?.code === "NOT_FOUND") {
			return (
				<ErrorMessage code="404">
					This element does not exist.
				</ErrorMessage>
			);
		}
	}

	if (status !== "success" || toShow === undefined) return <Loader />;

	const date = DateTime.fromJSDate(new Date(toShow.date_of_creation)).toLocaleString(DateTime.DATETIME_FULL);

	return (
		<>
			<center className="p-10">
				<ElemBox name={toShow.name} color={toShow.color} width={100} />
			</center>

			<div className="mx-10">
				<div className="mb-1.5"><b>ID:</b>{` #${toShow.id}`}</div>
				<div className="mb-1.5"><b>Generation:</b>{` ${toShow.generation}`}</div>
				<div className="mb-1.5"><b>Complexity:</b>{` ${toShow.complexity}`}</div>
				<div className="flex items-center mb-1.5">
					<b>Creator:</b>&nbsp;<Avatar username={toShow.creator} width={28} />&nbsp;<Link href="/user/[username]" as={`/user/${toShow.creator}`} className="text-blue-600 dark:text-blue-500">{toShow.creator}</Link>
				</div>
				<div className="mb-1.5"><b>Date of Creation:</b> {date}</div>
			</div>

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
		</>
	);
}