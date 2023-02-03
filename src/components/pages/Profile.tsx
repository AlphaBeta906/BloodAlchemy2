import { useQuery } from "@tanstack/react-query";
import { DateTime } from "luxon";

import ErrorMessage from "../ErrorMessage";
import Avatar from "../Avatar";
import QueryWrapper from "../QueryWrapper";
import Loader from "../Loader";

type Props = {
	username: string;
}

function Base({ username }: Props) {
	const { isLoading, error, data } = useQuery({
		queryKey: ["element"],
		queryFn: async () => {
			const result = await fetch(`/api/user?username=${username}`);

			if (result.status === 204) {
				return 204;
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

	if (data === 204) {
		return (
			<ErrorMessage code="404">
				This element does not exist.
			</ErrorMessage>
		);
	}

	const date = DateTime.fromJSDate(new Date(data.date_of_creation)).toLocaleString(DateTime.DATETIME_FULL);

	return (
		<>
			<center className="p-10">
				<Avatar username={username} width={100} />
				<h2 className="font-extrabold">{username}</h2>
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