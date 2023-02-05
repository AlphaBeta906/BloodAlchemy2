import { useQuery } from "@tanstack/react-query";
import { DateTime } from "luxon";

import ErrorMessage from "@/components/ErrorMessage";
import Avatar from "@/components/Avatar";
import QueryWrapper from "@/components/QueryWrapper";
import Loader from "@/components/Loader";

type Props = {
	username: string;
}

function Base({ username }: Props) {
	const { isLoading, error, data } = useQuery({
		queryKey: ["element"],
		queryFn: async () => {
			const result = await fetch(`/api/user?username=${username}`);

			if (result.status === 404) {
				return 404;
			}

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

	if (data === 404) {
		return (
			<ErrorMessage code="404">
				This element does not exist.
			</ErrorMessage>
		);
	}

	const date = DateTime.fromJSDate(new Date(data.date_of_creation)).toLocaleString(DateTime.DATETIME_FULL);

	console.log(["AlphaBeta906"].includes(username) && "man");

	return (
		<>
			<center className="p-10">
				<Avatar username={username} width={100} />
				<h2 className="font-extrabold">{username}</h2>
				{["AlphaBeta906"].includes(username) && <div className="badge bg-transparent border-red-500 text-red-500 mx-1 my-2 h-6">🛡️ Creator</div>}
				{["AlphaBeta906"].includes(username) && <div className="badge bg-transparent border-lime-600 text-lime-600 mx-1 my-2 h-6">🧪 Beta Tester</div>}
			</center>

			<div className="mx-10">
				<div className="mb-1.5"><b>Date of Creation:</b> {date}</div>
			</div>
		</>
	);
}

export default function Profile({ username }: Props) {
	return (
		<QueryWrapper>
			<Base username={username} />
		</QueryWrapper>
	);
}